"use client";
import { AdminService } from "@/app/services/adminService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, Mail, Phone, MapPin, Building2, User, Check, ChevronLeft, ChevronRight } from "lucide-react";

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

    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    const fetchBranchUsers = async (page: number = 1) => {
        try {
            setUsersLoading(true);
            const res = await AdminService.getBranchUsers(page);

            // 1. Set the users for the current page
            setBranchUsers(res.data || []);

            // 2. Map pagination based on your specific JSON structure: res.pagination
            if (res.pagination) {
                setTotalPages(res.pagination.total_pages || 1);
                setCurrentPage(res.pagination.current_page || 1);
            } else {
                // Fallback for older logic if necessary
                const lastPage = res.meta?.last_page || res.last_page || 1;
                const current = res.meta?.current_page || res.current_page || 1;
                setTotalPages(lastPage);
                setCurrentPage(current);
            }
        } catch (err) {
            toast.error("Failed to fetch branch users");
        } finally {
            setUsersLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
        fetchBranchUsers(1);
    }, []);

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
            fetchBranchUsers(currentPage); // Refresh current page
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
                        <h2 className="text-xl font-semibold text-gray-900">Branch Profiles</h2>
                        <p className="text-sm text-gray-500 mt-1">List of users with branch access roles</p>
                    </div>

                    {usersLoading ? (
                        <div className="p-10 text-center text-gray-500 border border-dashed rounded-xl">Loading users...</div>
                    ) : branchUsers.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 border border-dashed rounded-xl">No branch users found</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {branchUsers.map((user) => {
                                    const isAssigned = !!user.branch_id;
                                    return (
                                        <div
                                            key={user.id}
                                            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-200">
                                            {/* Top Glow */}
                                            <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-slate-900 via-slate-600 to-slate-300 opacity-80" />

                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-700 shadow-inner">
                                                        <User size={22} />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-base leading-tight">
                                                            {user.name}
                                                        </h3>

                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                                                                {user.role}
                                                            </span>

                                                            {isAssigned ? (
                                                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border-emerald-200 px-2 py-1 rounded-full">
                                                                    Assigned
                                                                </span>
                                                            ) : (
                                                                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border-amber-200 px-2 py-1 rounded-full">
                                                                    Unassigned
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* User Info */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <Mail size={14} className="text-gray-500" />
                                                    </div>
                                                    <span className="truncate">{user.email}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <Phone size={14} className="text-gray-500" />
                                                    </div>

                                                    <span>
                                                        {user.mobile !== "null" ? user.mobile : "No mobile number"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <MapPin size={14} className="text-gray-500" />
                                                    </div>

                                                    <span>
                                                        {user.city}, {user.state}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Branch Status Card */}
                                            <div
                                                className={`mt-5 rounded-2xl shadow-sm border p-4 ${isAssigned
                                                    ? "border-green-200 bg-linear-to-br from-emerald-50/80 to-white"
                                                    : "border-orange-200 bg-linear-to-br from-amber-50/80 to-white"
                                                    }`}>
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${isAssigned
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-orange-100 text-orange-700"
                                                            }`}>
                                                        <Building2 size={18} />
                                                    </div>

                                                    <div className="flex-1">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                                                            Branch Status
                                                        </p>

                                                        {isAssigned ? (
                                                            <>
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {user.branch_name}
                                                                </h4>

                                                                <p className="text-sm text-gray-600 mt-0.5">
                                                                    {user.branch_city},{" "}
                                                                    {user.branch_state}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h4 className="font-semibold text-orange-700">
                                                                    No Branch Assigned
                                                                </h4>

                                                                <p className="text-sm text-gray-500 mt-0.5">
                                                                    Assign a branch profile below
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Assign / Update UI */}
                                            <div className="mt-5 pt-5 border-t border-gray-100">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        {isAssigned ? "Update Branch" : "Assign Branch"}
                                                    </label>

                                                    {isAssigned && (
                                                        <span className="text-[11px] text-green-700 font-medium">
                                                            Currently Assigned
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-2 w-full">
                                                    <select
                                                        className="w-full sm:flex-1 min-w-0 rounded-2xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 focus:bg-white"
                                                        value={
                                                            selectedBranchForUser[user.id] ||
                                                            user.branch_id || ""
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedBranchForUser({
                                                                ...selectedBranchForUser,
                                                                [user.id]: Number(e.target.value),
                                                            })
                                                        }>
                                                        <option value="">
                                                            {isAssigned
                                                                ? "Change Branch"
                                                                : "Select Branch"}
                                                        </option>

                                                        {branches.map((b) => (
                                                            <option key={b.id} value={b.id}>
                                                                {b.name} • {b.city}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <button
                                                        onClick={() => handleAssignBranch(user.id)}
                                                        className={`shrink-0 px-4 py-2.5 rounded-xl flex items-center justify-center transition text-white shadow-sm ${isAssigned
                                                            ? "bg-slate-800 hover:bg-slate-900"
                                                            : "bg-slate-900 hover:bg-black"
                                                            }`}
                                                        title={
                                                            isAssigned
                                                                ? "Update Branch"
                                                                : "Assign Branch"
                                                        }>
                                                        {isAssigned ? (
                                                            <Pencil size={16} />
                                                        ) : (
                                                            <Check size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => fetchBranchUsers(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <span className="text-sm font-medium text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => fetchBranchUsers(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </>
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