"use client";
import { AdminService } from "@/app/services/adminService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, Mail, Phone, MapPin, Building2, User, Check } from "lucide-react";

interface Branch {
    id: number;
    name: string;
    city: string;
    state: string;
}

interface BranchUser {
    id: number;
    name: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    role: string;
    date_joined: string;
    branch_id: number | null;
    branch_name: string | null;
    branch_city: string | null;
    branch_state: string | null;
}

export default function BranchPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Branch | null>(null);

    const [branchUsers, setBranchUsers] = useState<BranchUser[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    
    // State to track which branch is selected for which user locally
    const [selectedBranchForUser, setSelectedBranchForUser] = useState<{ [key: number]: number }>({});

    const [form, setForm] = useState({
        name: "",
        city: "",
        state: "",
    });

    const fetchBranches = async () => {
        try {
            setLoading(true);
            const res = await AdminService.getBranches();
            setBranches(res.data || []);
        } catch (err) {
            toast.error("Failed to fetch branches");
        } finally {
            setLoading(false);
        }
    };

    const fetchBranchUsers = async () => {
        try {
            setUsersLoading(true);
            const res = await AdminService.getBranchUsers();
            setBranchUsers(res.data || []);
        } catch (err) {
            console.error("Failed to fetch branch users", err);
        } finally {
            setUsersLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
        fetchBranchUsers();
    }, []);

    // --- NEW LOGIC FOR ASSIGNING BRANCH ---
    const handleAssignBranch = async (userId: number) => {
        const branchId = selectedBranchForUser[userId];
        if (!branchId) {
            toast.error("Please select a branch first");
            return;
        }

        try {
            const res = await AdminService.assignBranchUser({
                user_id: userId,
                branch_id: branchId
            });
            toast.success(res.message || "Branch assigned successfully");
            fetchBranchUsers(); // Refresh the list to show new assignment
        } catch (err) {
            toast.error("Failed to assign branch");
        }
    };

    const handleSubmit = async () => {
        try {
            if (editing) {
                await AdminService.updateBranch(editing.id, form);
            } else {
                await AdminService.createBranch(form);
            }
            setOpen(false);
            setEditing(null);
            setForm({ name: "", city: "", state: "" });
            fetchBranches();
        } catch (err) {
            toast.error("Failed to save branch");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this branch?")) return;
        try {
            await AdminService.deleteBranch(id);
            fetchBranches();
        } catch (err) {
            toast.error("Failed to delete branch");
        }
    };

    const handleEdit = (b: Branch) => {
        setEditing(b);
        setForm({ name: b.name, city: b.city, state: b.state });
        setOpen(true);
    };

    return (
        <div className="min-h-screen px-4 md:px-10 py-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Branches</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your organization branches</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditing(null);
                            setForm({ name: "", city: "", state: "" });
                            setOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
                        <Plus size={16} />
                        New Branch
                    </button>
                </div>

                {/* Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Loading...</div>
                    ) : branches.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">No branches created yet</div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="text-left px-6 py-3 font-medium">id</th>
                                    <th className="text-left px-6 py-3 font-medium">Name</th>
                                    <th className="text-left px-6 py-3 font-medium">City</th>
                                    <th className="text-left px-6 py-3 font-medium">State</th>
                                    <th className="text-right px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branches.map((b) => (
                                    <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{b.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{b.city}</td>
                                        <td className="px-6 py-4 text-gray-600">{b.state}</td>
                                        <td className="px-6 py-4 flex justify-end gap-4">
                                            <button onClick={() => handleEdit(b)} className="text-gray-500 hover:text-black">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Branch Users Section */}
                <div className="mt-16">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Branch Users</h2>
                        <p className="text-sm text-gray-500 mt-1">List of users with branch access roles</p>
                    </div>

                    {usersLoading ? (
                        <div className="p-10 text-center text-gray-500 border border-dashed rounded-xl">Loading users...</div>
                    ) : branchUsers.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 border border-dashed rounded-xl">No branch users found</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {branchUsers.map((user) => (
                                <div key={user.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 leading-none">{user.name}</h3>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {user.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail size={14} className="text-gray-400" />
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                <span>{user.mobile !== "null" ? user.mobile : "No mobile"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin size={14} className="text-gray-400" />
                                                <span>{user.city}, {user.state}</span>
                                            </div>

                                            <div className="pt-3 mt-3 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Building2 size={14} className="text-gray-400" />
                                                    <span className="font-medium text-gray-700">
                                                        {user.branch_name || "Unassigned"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* API Assignment UI */}
                                    <div className="mt-5 pt-4 border-t border-gray-50">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Assign Branch</label>
                                        <div className="flex gap-2">
                                            <select 
                                                className="flex-1 text-xs border border-gray-200 text-gray-600 rounded px-2 py-1.5 focus:outline-none focus:ring-1 bg-gray-50"
                                                value={selectedBranchForUser[user.id] || ""}
                                                onChange={(e) => setSelectedBranchForUser({
                                                    ...selectedBranchForUser,
                                                    [user.id]: Number(e.target.value)
                                                })}
                                            >
                                                <option value="">Select Branch</option>
                                                {branches.map(b => (
                                                    <option key={b.id} value={b.id}>{b.name}</option>
                                                ))}
                                            </select>
                                            <button 
                                                onClick={() => handleAssignBranch(user.id)}
                                                className="bg-black text-gray-600 text-white p-1.5 rounded hover:bg-gray-800 transition"
                                                title="Confirm Assignment"
                                            >
                                                <Check size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
                        <h2 className="text-lg font-semibold mb-6 text-gray-900">
                            {editing ? "Edit Branch" : "Create Branch"}
                        </h2>
                        <div className="space-y-4">
                            <input
                                placeholder="Branch Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                            <input
                                placeholder="City"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                            <input
                                placeholder="State"
                                value={form.state}
                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                                {editing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}