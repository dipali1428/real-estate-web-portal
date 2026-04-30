"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
// Import your existing configured api instance
import api from "../../services/api"; 

// --- INTEGRATED API SERVICE (LOGIC PRESERVED) ---
const directorService = {
    getDirectorProfile: async () => {
        const response = await api.get('/api/director/get-director-profile');
        return response.data;
    },
    updateDirectorProfile: async (data: any) => {
        const response = await api.put('/api/director/update-director-profile', data);
        return response.data;
    }
};

interface Profile {
    name: string;
    email: string;
    mobile: string;
    role: string;
    password?: string;
}

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);

    const hasFetched = useRef(false);

    // FETCH PROFILE LOGIC
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await directorService.getDirectorProfile();
                const userData = res.user || res.data || res;
                setProfile(userData);
            } catch (err) {
                toast.error("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const evaluatePassword = (pwd: string) => {
        if (!pwd) return setPasswordStrength("");
        if (pwd.length < 6) return setPasswordStrength("Weak");
        if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return setPasswordStrength("Medium");
        return setPasswordStrength("Strong");
    };

    if (loading || !profile)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                <Loader2 className="animate-spin mr-2" /> Loading profile...
            </div>
        );

    return (
        <main className="w-full px-4 py-6 min-h-screen">
            <section className="w-full bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
                        Director Profile
                    </h2>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 text-[#1CADA3] border border-[#1CADA3] rounded-lg hover:bg-[#1CADA3] hover:text-white transition">
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>

                {/* Form Container */}
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>

                    {/* NAME */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            disabled
                            value={profile.name || ""}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* ROLE */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Role</label>
                        <input
                            type="text"
                            disabled
                            value={profile.role || "Director"}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            disabled={!isEditing}
                            value={profile.email || ""}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${
                                isEditing
                                    ? "border border-[#1CADA3] bg-white text-gray-800 shadow-sm"
                                    : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                        />
                    </div>

                    {/* MOBILE */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Mobile</label>
                        <input
                            type="tel"
                            disabled={!isEditing}
                            value={profile.mobile || ""}
                            onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${
                                isEditing
                                    ? "border border-[#1CADA3] bg-white text-gray-800 shadow-sm"
                                    : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                        />
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">New Password</label>
                        <input
                            type="password"
                            disabled={!isEditing}
                            value={profile.password || ""}
                            onChange={(e) => {
                                evaluatePassword(e.target.value);
                                setProfile({ ...profile, password: e.target.value });
                            }}
                            placeholder={isEditing ? "Enter new password" : "••••••••"}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${
                                isEditing
                                    ? "border border-[#1CADA3] bg-white text-gray-800 shadow-sm"
                                    : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                        />
                        {isEditing && profile.password && (
                            <p className="text-xs mt-1 font-medium text-gray-600">
                                Password Strength: <span className={
                                    passwordStrength === "Strong" ? "text-green-600" : 
                                    passwordStrength === "Medium" ? "text-yellow-600" : "text-red-500"
                                }>{passwordStrength}</span>
                            </p>
                        )}
                    </div>
                </form>

                {/* SAVE BUTTON */}
                {isEditing && (
                    <div className="flex justify-end mt-8">
                        <button
                            disabled={saving}
                            onClick={async () => {
                                try {
                                    setSaving(true);
                                    const payload = {
                                        email: profile.email,
                                        mobile: profile.mobile,
                                        password: profile.password || undefined,
                                    };
                                    await directorService.updateDirectorProfile(payload);
                                    toast.success("Profile updated successfully!");
                                    setIsEditing(false);
                                } catch (err: any) {
                                    toast.error(err?.response?.data?.message || "Failed to update profile.");
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            className="px-6 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#169c91] transition shadow-md disabled:opacity-70">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}