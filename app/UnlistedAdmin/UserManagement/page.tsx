'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, UnlistedUser, AddUserPayload, UpdateUserPayload } from "../../services/unlistedadminservices";
import { 
  Users, Search, RotateCw, 
  ChevronLeft, ChevronRight, Phone, Hash, Pencil, Trash2, Plus, X
} from "lucide-react";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UnlistedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<Partial<UnlistedUser> | null>(null);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await AdminService.getUsers(page);
      if (response.success && Array.isArray(response.data)) {
        setUsers(response.data);
        setTotalPages(response.totalPages || 1); 
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // --- API ACTIONS ---

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await AdminService.deleteUser(id); 
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed. Check console for details.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      if (modalType === 'add') {
        // For ADD: All required fields must be present
        if (!selectedUser?.name || !selectedUser?.email || !selectedUser?.mobile) {
          alert("Name, Email and Mobile are required fields");
          setSubmitLoading(false);
          return;
        }

        const payload: AddUserPayload = {
          name: selectedUser.name,
          email: selectedUser.email,
          mobile: selectedUser.mobile,
          role: selectedUser.role || 'CUSTOMER',
          adv_id: selectedUser.adv_id || ''
        };
        
        await AdminService.addUser(payload);
        alert("User added successfully!");
      } else {
        // For EDIT: ID is required, all fields optional
        if (selectedUser?.id) {
          const payload: UpdateUserPayload = {};
          
          // Only add fields that have values
          if (selectedUser.name) payload.name = selectedUser.name;
          if (selectedUser.email) payload.email = selectedUser.email;
          if (selectedUser.mobile) payload.mobile = selectedUser.mobile;
          if (selectedUser.role) payload.role = selectedUser.role;
          if (selectedUser.adv_id !== undefined) payload.adv_id = selectedUser.adv_id;

          await AdminService.updateUser(selectedUser.id, payload);
          alert("User updated successfully!");
        }
      }
      
      setIsModalOpen(false);
      fetchUsers(currentPage);
    } catch (error: any) {
      console.error("Submit error:", error);
      const serverMessage = error.response?.data?.message || error.response?.data?.error || "Check all fields";
      alert(`Failed: ${serverMessage}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openModal = (type: 'add' | 'edit', user?: UnlistedUser) => {
    setModalType(type);
    setSelectedUser(user || { name: '', email: '', mobile: '', role: 'CUSTOMER', adv_id: '' });
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.adv_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 animate-fade-in">
      
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" /> User Management
          </h2>
          <p className="text-sm opacity-90">Manage platform users, roles, and advisor credentials.</p>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={() => openModal('add')}
             className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#2076C7] rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-all"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
          <button 
            onClick={() => fetchUsers(currentPage)} 
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
          >
            <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* --- SEARCH BAR --- */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4 items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total: {filteredUsers.length}</span>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Advisor ID</th>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="py-20 text-center animate-pulse text-gray-400 font-bold uppercase text-xs">Loading...</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                        <Hash className="w-3 h-3 text-gray-300" /> {user.adv_id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 text-sm font-medium">
                        <Phone className="w-3 h-3 text-[#1CADA3]" /> {user.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${
                        user.role === 'UNLISTED_ADMIN' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(user.date_joined).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openModal('edit', user)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">{modalType === 'add' ? 'Add New User' : 'Update User'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Full Name</label>
                  <input 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm"
                    value={selectedUser?.name || ''}
                    onChange={e => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Email Address</label>
                    <input 
                      required type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm"
                      value={selectedUser?.email || ''}
                      onChange={e => setSelectedUser({...selectedUser, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Mobile</label>
                    <input 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm"
                      value={selectedUser?.mobile || ''}
                      onChange={e => setSelectedUser({...selectedUser, mobile: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Advisor ID</label>
                    <input 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm"
                      value={selectedUser?.adv_id || ''}
                      onChange={e => setSelectedUser({...selectedUser, adv_id: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Role</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm bg-white"
                      value={selectedUser?.role || 'CUSTOMER'}
                      onChange={e => setSelectedUser({...selectedUser, role: e.target.value})}
                    >
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="UNLISTED_ADMIN">ADMIN</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitLoading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    modalType === 'add' ? 'Create Account' : 'Save Changes'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;