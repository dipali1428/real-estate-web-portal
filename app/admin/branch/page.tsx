"use client";
import { AdminService } from "@/app/services/adminService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Branch {
    id: number;
    name: string;
    city: string;
    state: string;
}

export default function BranchPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Branch | null>(null);

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

    useEffect(() => {
        fetchBranches();
    }, []);

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
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Branches
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your organization branches
                        </p>
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
                        <div className="p-10 text-center text-gray-400">
                            No branches created yet
                        </div>
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
                                    <tr
                                        key={b.id}
                                        className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {b.id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {b.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{b.city}</td>
                                        <td className="px-6 py-4 text-gray-600">{b.state}</td>
                                        <td className="px-6 py-4 flex justify-end gap-4">
                                            <button
                                                onClick={() => handleEdit(b)}
                                                className="text-gray-500 hover:text-black">
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(b.id)}
                                                className="text-gray-400 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 placeholder:text-gray-400"
                            />

                            <input
                                placeholder="City"
                                value={form.city}
                                onChange={(e) =>
                                    setForm({ ...form, city: e.target.value })
                                }
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 placeholder:text-gray-400"
                            />

                            <input
                                placeholder="State"
                                value={form.state}
                                onChange={(e) =>
                                    setForm({ ...form, state: e.target.value })
                                }
                                className="w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm text-gray-600">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                                {editing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}