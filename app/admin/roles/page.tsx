"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, UserRound, SquarePen, X } from 'lucide-react'; 
import { AdminService } from '../../services/adminService';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

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
      const name = item.name?.toLowerCase() || "";
      const id = item.id?.toString().toLowerCase() || "";
      const city = item.city?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch = name.includes(search) || id.includes(search) || city.includes(search);
      const matchesDept = deptFilter === "All" || item.department === deptFilter;
      const matchesSub = subFilter === "All" || (item.sub_category || item.subcategory) === subFilter;

      return matchesSearch && matchesDept && matchesSub;
    });
  }, [searchTerm, deptFilter, subFilter, data]);

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
      fetchRoles(); // Refresh data to show changes
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  // 4. Helper to render table rows WITHOUT .map()
  const renderTableRows = () => {
    const rows = [];
    
    if (loading) {
      return (
        <tr>
          <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
            <div className="animate-spin h-6 w-6 border-b-2 border-[#2076C7] mx-auto mb-2 rounded-full"></div>
            Loading records...
          </td>
        </tr>
      );
    }

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
            No results found matching your criteria.
          </td>
        </tr>
      );
    }

    for (const user of filteredData) {
      const formatDateTime = (dateTimeStr: string) => {
        if (!dateTimeStr || dateTimeStr === '-') return '-';
        const parts = dateTimeStr.includes('T') ? dateTimeStr.split('T') : dateTimeStr.split(' ');
        if (parts.length < 2) return dateTimeStr;
        return (
          <div className="flex flex-col">
            <span className="whitespace-nowrap">{parts[0]}</span>
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {parts[1].split('.')[0]}
            </span>
          </div>
        );
      };

      rows.push(
        <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleEditClick(user)}
                className="text-gray-400 hover:text-[#2076C7] transition-colors"
              >
                <SquarePen size={16} />
              </button>
              <span className="text-[#2076C7] font-semibold">{user.id}</span>
            </div>
          </td>
          
          <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
            {user.name}
          </td>
          
          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.mobile}</td>
          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.city}</td>
          
          <td className="px-6 py-4">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'Admin' ? '' : ''}`} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${user.role === 'Admin' ? 'text-[#2076C7]' : 'text-[#2076C7]'}`}>
                {user.role}
              </span>
            </div>
          </td>
          
          <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.department}</td>
          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
            {user.sub_category || user.subcategory || '-'}
          </td>
          
          <td className="px-6 py-4 text-sm text-gray-500">
            {formatDateTime(user.date_joined || user.dateJoined)}
          </td>
          
          <td className="px-6 py-4 text-sm text-gray-500">
            {formatDateTime(user.updated_at || user.updatedAt)}
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UserRound className="text-[#2076C7]" /> Roles
          </h1>
          <p className="text-gray-500">View and manage team roles and departments.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, Name or City..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2076C7] text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {Array.from(new Set(data.map(d => d.department).filter(Boolean))).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
              value={subFilter}
              onChange={(e) => setSubFilter(e.target.value)}
            >
              <option value="All">All Subcategories</option>
              {Array.from(new Set(data.map(d => d.sub_category || d.subcategory).filter(Boolean))).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subcategory</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredData.length} of {data.length} records
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Edit Role Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.mobile}
                  onChange={(e) => setEditingUser({...editingUser, mobile: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.city}
                  onChange={(e) => setEditingUser({...editingUser, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.department}
                  onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subcategory</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none bg-white text-gray-900"
                  value={editingUser.sub_category || editingUser.subcategory}
                  onChange={(e) => setEditingUser({...editingUser, sub_category: e.target.value})}
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-6 py-2 bg-[#1a5da1] text-white rounded-lg text-sm font-bold hover:bg-[#1a5da1] shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}