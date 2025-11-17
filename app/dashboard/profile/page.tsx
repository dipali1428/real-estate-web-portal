"use client";
import { useEffect, useState } from "react";
import { DashboardService } from "@/app/services/dashboardService";

interface Profile {
    adv_id: string;
    name: string;
    email: string;
    mobile: string;
    pan: string;
    city: string;
    head: string;
    category: string;
    password: string;
}

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) return;
                setLoading(true);
                const response = await DashboardService.getProfile();
                setProfile(response.user);
            } catch (err: any) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const setField = (key: keyof Profile, value: string) => {
        if (!profile) return;
        setProfile((prev) => prev ? { ...prev, [key]: value } : null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3] font-medium">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-red-600 font-medium">
                {error}
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-500">
                No profile data available.
            </div>
        );
    }

    return (
        <main className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-linear-to-br from-blue-50 via-teal-50 to-emerald-50 min-h-screen overflow-y-auto">
            <section className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
                    <h2 className="text-3xl font-bold text-[#1CADA3] tracking-tight">
                        Profile Information
                    </h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm px-5 py-2 rounded-lg border border-[#1CADA3] text-[#1CADA3] hover:bg-[#E8F6FA] transition-all duration-200">
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>

                {/* FORM */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Advisor ID", key: "adv_id", disabled: true },
                        { label: "Name", key: "name" },
                        { label: "Email", key: "email", disabled: true },
                        { label: "Mobile", key: "mobile", disabled: true },
                        { label: "PAN Number", key: "pan" },
                        { label: "City", key: "city" },
                    ].map((f) => (
                        <div key={f.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {f.label}
                            </label>
                            <input
                                type="text"
                                value={(profile as any)[f.key]}
                                disabled={f.disabled || !isEditing}
                                onChange={(e) =>
                                    setField(f.key as keyof Profile, e.target.value)
                                }
                                className={`w-full rounded-lg border px-3 py-2 text-sm transition ${f.disabled || !isEditing
                                    ? "border-gray-300 bg-gray-100 text-gray-700"
                                    : "border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30"
                                    }`}
                            />
                        </div>
                    ))}

                    {/* Head Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Head Category
                        </label>
                        <select
                            value={profile.head}
                            disabled={!isEditing}
                            onChange={(e) => setField("head", e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 text-sm transition ${isEditing
                                ? "border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30"
                                : "border-gray-300 bg-gray-100 text-gray-700"
                                }`}>
                            <option>Investment</option>
                            <option>Protection</option>
                            <option>Finance</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            value={profile.category}
                            disabled={!isEditing}
                            onChange={(e) => setField("category", e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 text-sm transition ${isEditing
                                ? "border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30"
                                : "border-gray-300 bg-gray-100 text-gray-700"
                                }`}
                        />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={profile.password}
                            disabled={!isEditing}
                            onChange={(e) => setField("password", e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 text-sm transition ${isEditing
                                ? "border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30"
                                : "border-gray-300 bg-gray-100 text-gray-700"
                                }`}
                        />
                    </div>
                </form>

                {isEditing && (
                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            type="button"
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={() => {
                                setIsEditing(false);
                                // TODO: Call update API here
                            }}
                            className="px-5 py-2 rounded-lg bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md hover:shadow-lg text-sm transition">
                            Save Changes
                        </button>
                    </div>
                )}

            </section>
        </main>
    );
}
