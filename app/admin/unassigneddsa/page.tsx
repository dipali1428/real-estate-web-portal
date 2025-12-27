'use client';
import React, { useState, useEffect } from 'react';
import {
  Search, User, Users, CheckCircle,
  RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import { AdminService } from '../../services/adminService';
import { Tab } from '@headlessui/react';
// --- INTERFACES ---
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  subCategory: string;
  assignedTo: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  dsa?: {
    id: number;
    name: string;
    code?: string;
    phone?: string;
  } | null;
}

interface RelationshipManager {
  id: string | number;
  name: string;
  department: string;
  sub_category?: string;
  currentLeads: number;
  maxLeads: number;
}

interface AssignConfirmation {
  show: boolean;
  leadId: string;
  leadName: string;
  rmId: string;
  rmName: string;
  rmSubCategories: string;
  department: string;
  subCategory: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// const AdminService = {
//   getRMList: async () => {
//     const response = await api.get("/api/admin/rmlist");
//     return response.data;
//   },
//   // Ensure this endpoint matches your Backend Route exactly (e.g., /api/admin/assign-rm)
//   assignDsaToRm: async (payload: {
//     dsa_id: string;
//     rm_id: string;
//     department: string;
//     sub_category: string;
//   }) => {
//     const response = await api.post("/api/admin/assign-dsa-to-rm", payload);
//     return response.data;
//   },
// };

export default function AdminLeadPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rms, setRms] = useState<RelationshipManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [rmLoading, setRmLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'unassigned' | 'assigned'>('unassigned');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const [assignConfirmation, setAssignConfirmation] = useState<AssignConfirmation>({
    show: false, leadId: '', leadName: '', rmId: '', rmName: '', rmSubCategories: '', department: '', subCategory: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getUnassignedDsas();
      const mapped: Lead[] = (res.dsas || []).map((item: any) => ({
        id: String(item.id),
        name: item.name,
        email: item.email,
        phone: item.mobile,
        city: item.city,
        department: item.head?.toLowerCase().replace(/\s+/g, '_') || '',
        subCategory: item.category || '',
        assignedTo: item.assigned_rm_name || null,
        status: 'new',
        dsa: { id: item.id, name: item.name, code: item.adv_id, phone: item.mobile }
      }));
      setLeads(mapped);
    } catch (err) { console.error("Sync failed."); } finally { setLoading(false); }
  };

  const fetchRMs = async () => {
    setRmLoading(true);
    try {
      const res = await AdminService.getRms();
      setRms(res.rms || []);
    } finally { setRmLoading(false); }
  };

  useEffect(() => { fetchData(); fetchRMs(); }, []);

  const normalize = (str: string) => str?.toLowerCase().replace(/[\s_]/g, '') || '';
  const getRMsForLead = (lead: Lead) => {
    const filtered = rms.filter(rm =>
      normalize(rm.department) === normalize(lead.department) ||
      rm.department?.toLowerCase() === 'all'
    );
    return filtered.length > 0 ? filtered : rms;
  };

  // --- API HANDLER FOR CONFIRM BUTTON ---
  const confirmAssignment = async () => {
    try {
      const { leadId, rmId } = assignConfirmation;

      const res = await AdminService.assignDsaToRm({
        dsa_id: leadId,
        rm_id: rmId
      });

      if (res.success || res.status === 'success') {
        alert("RM Assigned successfully!");
        setAssignConfirmation(prev => ({ ...prev, show: false }));
        fetchData(); // Refresh the list
      } else {
        alert(res.message || "Assignment failed.");
      }
    } catch (error: any) {
      console.error("Assignment error:", error);
      if (error.response?.status === 404) {
        alert("Error 404: The API endpoint was not found. Please check if the route '/api/admin/assign-dsa-to-rm' exists in your backend.");
      } else {
        alert("An error occurred during assignment.");
      }
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.dsa?.code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'assigned' ? l.assignedTo !== null : l.assignedTo === null;
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const currentLeadsSlice = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="p-20 text-center"><RefreshCw className="animate-spin mx-auto w-10 h-10 text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Unassigned DSA's</h1>
            <p className="text-slate-500">Assign leads to relationship managers</p>
          </div>
          <button onClick={() => { fetchData(); fetchRMs(); }} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#1CADA3]">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-blue-500 bg-blue-50 p-2 rounded-md mr-4" />
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Unassigned</p>
                {/* Added text-gray-900 for dark mode visibility */}
                <p className="text-2xl font-bold text-gray-900">{leads.filter(l => !l.assignedTo).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#1CADA3]">
            <div className="flex items-center">
              <CheckCircle className="w-10 h-10 text-green-500 bg-green-50 p-2 rounded-md mr-4" />
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Assigned</p>
                {/* Added text-gray-900 for dark mode visibility */}
                <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.assignedTo).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#1CADA3]">
            <div className="flex items-center">
              <User className="w-10 h-10 text-purple-500 bg-purple-50 p-2 rounded-md mr-4" />
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Total RMs</p>
                {/* Added text-gray-900 for dark mode visibility */}
                <p className="text-2xl font-bold text-gray-900">{rms.length}</p>
              </div>
            </div>
          </div>
        </div>

        <Tab.Group onChange={(index) => { setActiveTab(index === 0 ? 'unassigned' : 'assigned'); setCurrentPage(1); }}>
          <Tab.List className="flex space-x-1 bg-blue-900/10 p-1 rounded-xl mb-6">
            <Tab className={({ selected }) => classNames('w-full py-2.5 text-sm font-medium rounded-lg', selected ? 'bg-white text-blue-700 shadow' : 'text-blue-600 hover:text-blue-800')}>Unassigned Leads</Tab>
            <Tab className={({ selected }) => classNames('w-full py-2.5 text-sm font-medium rounded-lg', selected ? 'bg-white text-blue-700 shadow' : 'text-blue-600 hover:text-blue-800')}>Assigned Leads</Tab>
          </Tab.List>

          <Tab.Panel className="bg-white rounded-xl shadow p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search by name or ADV ID..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 outline-none focus:ring-1 focus:ring-blue-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs text-gray-400 uppercase font-semibold">
                    <th className="px-6 py-3"><input type="checkbox" onChange={(e) => setSelectedLeads(e.target.checked ? currentLeadsSlice.map(l => l.id) : [])} /></th>
                    <th className="px-6 py-3">ADV_ID</th>
                    <th className="px-6 py-3">DSA Details</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Sub-Category</th>
                    <th className="px-6 py-3">City</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentLeadsSlice.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                      <td className="px-6 py-4"><input type="checkbox" checked={selectedLeads.includes(l.id)} onChange={() => setSelectedLeads(p => p.includes(l.id) ? p.filter(x => x !== l.id) : [...p, l.id])} /></td>
                      <td className="px-6 py-4 font-bold text-blue-600">{l.dsa?.code}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{l.name}</div>
                        <div className="text-xs text-gray-500">{l.phone}</div>
                      </td>
                      <td className="px-6 py-4 capitalize">{l.department.replace('_', ' ')}</td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]" title={l.subCategory}>
                        {l.subCategory || '-'}
                      </td>
                      <td className="px-6 py-4">{l.city}</td>
                      <td className="px-6 py-4">
                        {l.assignedTo ? (
                          <div className="text-green-600 font-semibold flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> {l.assignedTo}</div>
                        ) : (
                          <select
                            className="border rounded p-1.5 w-44 text-xs bg-white outline-none focus:border-blue-500"
                            onChange={(e) => {
                              const rm = rms.find(r => String(r.id) === e.target.value);
                              if (rm) setAssignConfirmation({
                                show: true,
                                leadId: l.id,
                                leadName: l.name,
                                rmId: String(rm.id),
                                rmName: rm.name,
                                rmSubCategories: rm.sub_category || 'No categories listed',
                                department: l.department,
                                subCategory: l.subCategory
                              });
                            }}
                            value=""
                          >
                            <option value="">Select RM</option>
                            {rmLoading ? <option disabled>Loading...</option> :
                              getRMsForLead(l).map(rm => (
                                <option key={rm.id} value={rm.id}>{rm.name} ({rm.department})</option>
                              ))
                            }
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-end items-center mt-6 space-x-3">
                <span className="text-xs text-gray-400 font-medium">Page {currentPage} of {totalPages}</span>
                <div className="inline-flex rounded-md shadow-sm border bg-white overflow-hidden">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border-r hover:bg-gray-50 disabled:opacity-30">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 hover:bg-gray-50 disabled:opacity-30">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </Tab.Panel>
        </Tab.Group>
      </div>

      {/* Confirmation Modal */}
      {assignConfirmation.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Assignment</h3>
            <p className="text-sm text-gray-500 mb-4">Assign RM <span className="text-blue-600 font-bold">{assignConfirmation.rmName}</span> to the DSA <span className="text-blue-600 font-bold">{assignConfirmation.leadName}</span>?</p>

            <div className="mb-6 p-3 bg-gray-50 rounded border border-gray-100 overflow-hidden">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">RM Working In:</p>
              <p className="text-xs text-gray-700 font-medium truncate whitespace-nowrap" title={assignConfirmation.rmSubCategories}>
                {assignConfirmation.rmSubCategories}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setAssignConfirmation(p => ({ ...p, show: false }))} className="flex-1 py-2 text-gray-600 bg-gray-50 border rounded-lg hover:bg-gray-100 font-medium">Cancel</button>
              <button onClick={confirmAssignment} className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}