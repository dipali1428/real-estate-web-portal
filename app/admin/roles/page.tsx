"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { SquarePen, X, Plus } from 'lucide-react';
import { AdminService } from '../../services/adminService';
import toast, { Toaster } from 'react-hot-toast';
import { Clock } from "lucide-react"

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [activeRoleTab, setActiveRoleTab] = useState<"ALL" | "ADMIN" | "RM" | "DEPARTMENTHEAD">("ALL");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    adv_id: '',
    name: '',
    email: '',
    mobile: '',
    pan: '',
    city: '',
    head: '',
    category: '',
    password: '',
    role: 'ADMIN',
    department: '',
    sub_category: '',
    referral_code: ''
  });

  // 1. Fetch data on mount
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
      console.error("Failed to fetch roles:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // 2. Logic for filtering
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter((item) => {

      const matchesRole =
        activeRoleTab === "ALL" || item.role === activeRoleTab;

      return matchesRole;
    });
  }, [activeRoleTab, data]);

  // Handler to open edit modal
  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  // 3. API Update Function
  const handleUpdate = async () => {
    try {
      const payload = {
        name: editingUser.name,
        email: editingUser.email,
        mobile: editingUser.mobile,
        city: editingUser.city,
        role: editingUser.role,
        department: editingUser.department,
        sub_category: editingUser.sub_category || editingUser.subcategory
      };

      await AdminService.updaterolelist(editingUser.id, payload);

      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  // 3.1 API Create Function
  const handleCreate = async () => {
    if (!newUser.adv_id || !newUser.email || !newUser.name) {
      toast.error("Adv ID, Name, and Email are required");
      return;
    }

    try {
      const payload: any = {
        adv_id: newUser.adv_id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        pan: newUser.pan,
        city: newUser.city,
        head: newUser.head,
        category: newUser.category,
        password: newUser.password,
        role: newUser.role,
        department: newUser.department,
        sub_category: newUser.sub_category,
        referral_code: newUser.referral_code
      };

      await AdminService.addroleuser(payload);

      toast.success("Role added successfully!");
      setIsAddModalOpen(false);
      setNewUser({
        adv_id: '', name: '', email: '', mobile: '', pan: '', city: '',
        head: '', category: '', password: '', role: '',
        department: '', sub_category: '', referral_code: ''
      });
      fetchRoles();
    } catch (error: any) {
      const serverMsg = error.response?.data?.message || error.response?.data?.error || "Failed to add role";
      toast.error(serverMsg);
    }
  };

  // 4. Helper to render table rows
  const renderTableRows = () => {
    const rows = [];
    if (loading) {
      return (
        <tr>
          <td colSpan={11} className="px-6 py-12 text-center text-gray-500">
            <div className="animate-spin h-6 w-6 border-b-2 border-[#2076C7] mx-auto mb-2 rounded-full"></div>
            Loading...
          </td>
        </tr>
      );
    }

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={11} className="px-6 py-12 text-center text-gray-500">No results found.</td>
        </tr>
      );
    }

    for (const user of filteredData) {
      const formatDateTime = (dateTimeStr: string) => {
        if (!dateTimeStr || dateTimeStr === '-') return '-';

        const date = new Date(dateTimeStr);

        // Check if the date is actually valid
        if (isNaN(date.getTime())) return dateTimeStr;

        // Format Date: e.g., Oct 24, 2023
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        });

        // Format Time: e.g., 02:30 PM
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return (
          <div className="flex flex-col leading-tight min-w-20 sm:min-w-[90px]">
            <span className="text-[10px] sm:text-xs text-gray-700 whitespace-nowrap uppercase">
              {formattedDate}
            </span>

            <span className="flex items-center gap-1 text-[9px] sm:text-[11px] text-gray-600 tracking-wide whitespace-nowrap">
              <Clock className="w-3 h-3 shrink-0 text-gray-600" />
              {formattedTime}
            </span>
          </div>
        );
      };

      // Role Styling Logic
      const getRoleConfig = (role: string) => {
        const r = role?.toLowerCase() || '';
        if (r === 'admin') {
          return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' };
        } else if (r === 'rm') {
          return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' };
        } else {
          // Department Head or others
          return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' };
        }
      };

      const roleStyle = getRoleConfig(user.role);

      rows.push(
        <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
            <button
              onClick={() => handleEditClick(user)}
              className="p-2 sm:p-1 text-gray-400 hover:text-[#2076C7] transition-colors">
              <SquarePen size={18} />
            </button>
          </td>
          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
            <span className="text-[#2076C7] font-semibold">{user.id}</span>
          </td>
          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-normal sm:whitespace-nowrap">
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-sm font-bold text-gray-800">
                {user.name}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500">
                {user.email}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.mobile}</td>
          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.city}</td>
          <td className="px-6 py-4">
            <div className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border ${roleStyle.bg} ${roleStyle.border}`}>
              <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${roleStyle.text}`}>
                {user.role}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.department}</td>
          <td className="px-6 py-4 text-sm text-gray-500 whitespace-pre-wrap">{user.sub_category || user.subcategory || '-'}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(user.date_joined || user.dateJoined)}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(user.updated_at || user.updatedAt)}</td>
        </tr>
      );
    }
    return rows;
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2076C7] bg-white text-gray-900 placeholder-gray-500 font-medium";

  return (
    <div className="h-screen min-h-screen bg-gray-50 p-4 md:p-6  max-h-[93vh] overflow-hidden">
      <Toaster position="top-right" />
      <div className="max-w-full mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              Roles Management
            </h1>
            <p className="text-gray-500">View and manage team roles and departments.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2076C7] hover:bg-[#1a5da1] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md transition-all active:scale-95">
            <Plus size={20} /> Add Role
          </button>
        </div>

        {/* Role Wise Tabs */}
        <div className="border-b border-gray-200 flex gap-2">
          {[
            { key: "ALL", label: "All" },
            { key: "ADMIN", label: "Admin" },
            { key: "RM", label: "RM" },
            { key: "DEPARTMENTHEAD", label: "Department" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveRoleTab(tab.key as any)}
              className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all
        ${activeRoleTab === tab.key
                  ? "bg-white border-x border-t border-gray-200 text-[#2076C7]"
                  : "text-gray-500 hover:text-gray-700"
                }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="relative overflow-y-auto overflow-x-auto bg-gray-50">
          <div className="relative max-h-[70vh] overflow-y-auto overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
            <table className="w-full text-left border-collapse min-w-[1100px] rounded-2xl">
              <thead className="bg-gray-100 border-b font-sans border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">EDIT</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">ID</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">NAME</th>
                  {/* <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">EMAIL</th> */}
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">MOBILE</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">CITY</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">USER ROLE</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">DEPARTMENT</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">SUB CATEGORY</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">DATE JOINED</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 tracking-wider">LAST Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y font-sans divide-gray-100">
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Edit Role Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label><input type="text" className={inputClass} value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} /></div>
              <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label><input type="email" className={inputClass} value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} /></div>
              <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile</label><input type="text" className={inputClass} value={editingUser.mobile} onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })} /></div>
              <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label><input type="text" className={inputClass} value={editingUser.city} onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })} /></div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                <select className={inputClass} value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                  <option value="ADMIN">Admin</option>
                  <option value="RM">RM</option>
                  <option value="DEPARTMENTHEAD">Department Head</option>
                </select>
              </div>
              <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label><input type="text" className={inputClass} value={editingUser.department} onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })} /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subcategory</label><input type="text" className={inputClass} value={editingUser.sub_category || editingUser.subcategory} onChange={(e) => setEditingUser({ ...editingUser, sub_category: e.target.value })} /></div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={handleUpdate} className="px-6 py-2 bg-[#1a5da1] text-white rounded-lg text-sm font-bold shadow-md">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50 sticky top-0 z-10">
              <h3 className="text-xl font-bold text-gray-800">Add New Role</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Adv ID</label>
                <input type="text" placeholder="Enter Adv ID" className={inputClass} value={newUser.adv_id} onChange={(e) => setNewUser({ ...newUser, adv_id: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input type="text" placeholder="Enter Full Name" className={inputClass} value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" placeholder="Enter Email" className={inputClass} value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile</label>
                <input type="text" placeholder="Enter Mobile" className={inputClass} value={newUser.mobile} onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">PAN</label>
                <input type="text" placeholder="Enter PAN" className={inputClass} value={newUser.pan} onChange={(e) => setNewUser({ ...newUser, pan: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                <input type="text" placeholder="Enter City" className={inputClass} value={newUser.city} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Head</label>
                <input type="text" placeholder="Enter Head" className={inputClass} value={newUser.head} onChange={(e) => setNewUser({ ...newUser, head: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                <input type="text" placeholder="Enter Category" className={inputClass} value={newUser.category} onChange={(e) => setNewUser({ ...newUser, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <input type="password" placeholder="Enter Password" className={inputClass} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                <select className={inputClass} value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="ADMIN">Admin</option>
                  <option value="RM">RM</option>
                  <option value="DEPARTMENTHEAD">Department Head</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                <input type="text" placeholder="Enter Department" className={inputClass} value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sub Category</label>
                <input type="text" placeholder="Enter Sub Category" className={inputClass} value={newUser.sub_category} onChange={(e) => setNewUser({ ...newUser, sub_category: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Referral Code</label>
                <input type="text" placeholder="Enter Referral Code" className={inputClass} value={newUser.referral_code} onChange={(e) => setNewUser({ ...newUser, referral_code: e.target.value })} />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={handleCreate} className="px-8 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1a5da1]">Add Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}