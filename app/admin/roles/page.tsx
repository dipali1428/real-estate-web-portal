"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  SquarePen,
  X,
  Plus,
  Users,
  Search,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AdminService } from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";

// Consistency: Reusing the standard date formatter from reference
const formatDateTime = (value?: string) => {
  if (!value || value === "-") return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-gray-700 whitespace-nowrap uppercase">
        {formattedDate}
      </span>
      <span className="flex items-center gap-1 text-[10px] text-gray-500 tracking-wide whitespace-nowrap">
        <Clock className="w-3 h-3 shrink-0" />
        {formattedTime}
      </span>
    </div>
  );
};

export default function RolesManagementPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [activeRoleTab, setActiveRoleTab] = useState<
    "ALL" | "ADMIN" | "RM" | "DEPARTMENTHEAD"
  >("ALL");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    adv_id: "",
    name: "",
    email: "",
    mobile: "",
    pan: "",
    city: "",
    head: "",
    category: "",
    password: "",
    role: "ADMIN",
    department: "",
    sub_category: "",
    referral_code: "",
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await AdminService.rolesist();
      const actualData = response?.rolelist || [];
      setData(Array.isArray(actualData) ? actualData : []);
    } catch (error) {
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesRole = activeRoleTab === "ALL" || item.role === activeRoleTab;
      const haystack = `${item.name} ${item.email} ${item.id} ${item.mobile}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [activeRoleTab, data, search]);

  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    const loadId = toast.loading("Updating profile...");
    try {
      const payload = {
        name: editingUser.name,
        email: editingUser.email,
        mobile: editingUser.mobile,
        city: editingUser.city,
        role: editingUser.role,
        department: editingUser.department,
        sub_category: editingUser.sub_category || editingUser.subcategory,
      };
      await AdminService.updaterolelist(editingUser.id, payload);
      toast.success("Profile updated successfully!", { id: loadId });
      setIsEditModalOpen(false);
      fetchRoles();
    } catch (error) {
      toast.error("Failed to update profile", { id: loadId });
    }
  };

  const handleCreate = async () => {
    if (!newUser.adv_id || !newUser.email || !newUser.name) {
      return toast.error("Adv ID, Name, and Email are required");
    }
    const loadId = toast.loading("Creating role...");
    try {
      await AdminService.addroleuser(newUser);
      toast.success("Role added successfully!", { id: loadId });
      setIsAddModalOpen(false);
      setNewUser({
        adv_id: "", name: "", email: "", mobile: "", pan: "", city: "",
        head: "", category: "", password: "", role: "ADMIN",
        department: "", sub_category: "", referral_code: "",
      });
      fetchRoles();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add role", { id: loadId });
    }
  };

  const getRoleStyle = (role: string) => {
    const r = role?.toUpperCase();
    if (r === "ADMIN") return "bg-red-50 text-red-600 border-red-100";
    if (r === "RM") return "bg-blue-50 text-blue-600 border-blue-100";
    return "bg-green-50 text-green-600 border-green-100";
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2076C7] bg-white text-gray-700 placeholder-gray-400 text-sm transition-all";

  return (
    <div className="bg-gray-50 py-6 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-full mx-auto sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#2076C7]" /> Roles Management
            </h1>
            <p className="text-sm text-slate-600">Manage internal team roles and permissions.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-medium hover:bg-[#1a5fa1] shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" /> Add New Role
          </button>
        </div>

        {/* Tabs and Search Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit">
            {[
              { key: "ALL", label: "All Roles" },
              { key: "ADMIN", label: "Admins" },
              { key: "RM", label: "RMs" },
              { key: "DEPARTMENTHEAD", label: "Dept Heads" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveRoleTab(tab.key as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeRoleTab === tab.key
                    ? "bg-white text-[#2076C7] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2076C7] mx-auto mb-3" /> Loading roles...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-12 text-center text-gray-500">No roles found matching your criteria.</div>
          ) : (
            <div className="max-h-[65vh] overflow-x-auto">
              <table className="min-w-[1100px] w-full text-left border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User Details</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">City</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sub Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-1.5 text-gray-400 hover:text-[#2076C7] hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <SquarePen size={18} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-[#2076C7]">{user.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.mobile}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.city}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleStyle(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-[150px]" title={user.sub_category}>
                        {user.sub_category || user.subcategory || "-"}
                      </td>
                      <td className="px-4 py-3">{formatDateTime(user.date_joined || user.dateJoined)}</td>
                      <td className="px-4 py-3">{formatDateTime(user.updated_at || user.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-slate-800">Edit Role Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label><input type="text" className={inputClass} value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label><input type="email" className={inputClass} value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Mobile</label><input type="text" className={inputClass} value={editingUser.mobile} onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label><input type="text" className={inputClass} value={editingUser.city} onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })} /></div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role</label>
                <select className={inputClass} value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                  <option value="ADMIN">Admin</option>
                  <option value="RM">RM</option>
                  <option value="DEPARTMENTHEAD">Department Head</option>
                </select>
              </div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Department</label><input type="text" className={inputClass} value={editingUser.department} onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })} /></div>
              <div className="md:col-span-2"><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Subcategory</label><input type="text" className={inputClass} value={editingUser.sub_category || editingUser.subcategory} onChange={(e) => setEditingUser({ ...editingUser, sub_category: e.target.value })} /></div>
            </div>
            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500">Cancel</button>
              <button onClick={handleUpdate} className="px-6 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1a5fa1]">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">Add New Role</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Adv ID</label><input type="text" className={inputClass} value={newUser.adv_id} onChange={(e) => setNewUser({ ...newUser, adv_id: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label><input type="text" className={inputClass} value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label><input type="email" className={inputClass} value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Mobile</label><input type="text" className={inputClass} value={newUser.mobile} onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">PAN</label><input type="text" className={inputClass} value={newUser.pan} onChange={(e) => setNewUser({ ...newUser, pan: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label><input type="text" className={inputClass} value={newUser.city} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Head</label><input type="text" className={inputClass} value={newUser.head} onChange={(e) => setNewUser({ ...newUser, head: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category</label><input type="text" className={inputClass} value={newUser.category} onChange={(e) => setNewUser({ ...newUser, category: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Password</label><input type="password" className={inputClass} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role</label>
                <select className={inputClass} value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="ADMIN">Admin</option>
                  <option value="RM">RM</option>
                  <option value="DEPARTMENTHEAD">Department Head</option>
                </select>
              </div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Department</label><input type="text" className={inputClass} value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Sub Category</label><input type="text" className={inputClass} value={newUser.sub_category} onChange={(e) => setNewUser({ ...newUser, sub_category: e.target.value })} /></div>
              <div className="md:col-span-2"><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Referral Code</label><input type="text" className={inputClass} value={newUser.referral_code} onChange={(e) => setNewUser({ ...newUser, referral_code: e.target.value })} /></div>
            </div>

            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500">Cancel</button>
              <button onClick={handleCreate} className="px-8 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1a5fa1]">Create Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}