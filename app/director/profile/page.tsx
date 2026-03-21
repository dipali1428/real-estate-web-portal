"use client";

import { useEffect, useRef, useState } from "react";
// import { DepartmentHeadService } from "../../services/departmentHeadService";
import toast from "react-hot-toast";

interface Profile {
    name: string;
    email: string;
    mobile: string;
    role: string;
    department: string;
    city: string;
    sub_category: string;
    password?: string;
}

// Static Mock Data
const MOCK_PROFILE: Profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    role: "Department Administrator",
    department: "Information Technology",
    city: "New York",
    sub_category: "Infrastructure",
    password: ""
};

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);

    const hasFetched = useRef(false);

    // FETCH PROFILE DATA
    const fetchProfileData = async () => {
        try {
            setLoading(true);
            // API CALL COMMENTED OUT
            /*
            const res = await DepartmentHeadService.getDepartmentProfile();
            setProfile(res.user || res);
            */
            
            // Using Static Data
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
            setProfile(MOCK_PROFILE);
            
        } catch (err: any) {
            console.error("Profile load error", err);
            toast.error("Failed to fetch profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchProfileData();
    }, []);

    // Password strength checker
    const evaluatePassword = (pwd: string) => {
        if (!pwd) return setPasswordStrength("");
        if (pwd.length < 6) return setPasswordStrength("Weak");
        if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
            return setPasswordStrength("Medium");
        return setPasswordStrength("Strong");
    };

    // HANDLE SAVE (REAL API CALL)
    const handleSave = async () => {
        if (!profile) return;

        try {
            setSaving(true);

            const payload: any = {
                email: profile.email.trim(),
                mobile: profile.mobile.trim(),
            };

            if (profile.password && profile.password.trim().length > 0) {
                payload.password = profile.password.trim();
            }

            console.log("Submitting Static Payload:", payload);

            // API CALL COMMENTED OUT
            /*
            await DepartmentHeadService.updateDepartmentProfile(payload);
            await fetchProfileData();
            */

            // Simulating API Success
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Profile updated successfully (Static Mode)!");

            setProfile(prev => prev ? { ...prev, password: "" } : null);
            setIsEditing(false);
            setPasswordStrength("");

        } catch (err: any) {
            console.error("Update error detail:", err.response?.data);
            const errorMessage = err?.response?.data?.message || "Server error: Password might not meet requirements.";
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    if (loading || !profile)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-medium">Loading profile...</p>
                </div>
            </div>
        );

    return (
        <main className="w-full px-4 py-6 min-h-screen">
            <section className="w-full bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
                            {profile.department} Profile
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (isEditing) {
                                setProfile({ ...profile, password: "" });
                                fetchProfileData();
                            }
                            setIsEditing(!isEditing);
                        }}
                        className="px-4 py-2 text-[#1CADA3] border border-[#1CADA3] rounded-lg hover:bg-[#1CADA3] hover:text-white transition duration-200">
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* Form Container */}
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>

                    {/* NAME (Read Only) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-600">Full Name</label>
                        <input
                            type="text"
                            disabled
                            value={profile.name}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* ROLE (Read Only) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-600">System Role</label>
                        <input
                            type="text"
                            disabled
                            value={profile.role}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* EMAIL (Editable) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            disabled={!isEditing}
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${isEditing
                                ? "border-2 border-[#1CADA3] bg-white text-gray-800 shadow-sm outline-none"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                                }`}
                        />
                    </div>

                    {/* MOBILE (Editable) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            disabled={!isEditing}
                            value={profile.mobile}
                            onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${isEditing
                                ? "border-2 border-[#1CADA3] bg-white text-gray-800 shadow-sm outline-none"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                                }`}
                        />
                    </div>

                    {/* DEPARTMENT (Read Only) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-600">Department</label>
                        <input
                            type="text"
                            disabled
                            value={profile.department}
                            className="w-full mt-1 px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-gray-500 cursor-not-allowed font-medium"
                        />
                    </div>

                    {/* SUB CATEGORY (Read Only) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-600">Sub Category</label>
                        <input
                            type="text"
                            disabled
                            value={profile.sub_category}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* CITY (Read Only) */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-600">City</label>
                        <input
                            type="text"
                            disabled
                            value={profile.city}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* PASSWORD FIELD (Editable) */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">
                            New Password (Leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            disabled={!isEditing}
                            value={profile.password || ""}
                            onChange={(e) => {
                                evaluatePassword(e.target.value);
                                setProfile({ ...profile, password: e.target.value });
                            }}
                            placeholder={isEditing ? "Enter new password" : "••••••••"}
                            className={`w-full mt-1 px-3 py-2 rounded-lg transition-all ${isEditing
                                ? "border-2 border-[#1CADA3] bg-white text-gray-800 shadow-sm outline-none"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                                }`}
                        />
                        {isEditing && profile.password && (
                            <p className="text-xs mt-1 font-medium">
                                Strength: <span className={
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
                            type="button"
                            disabled={saving}
                            onClick={handleSave}
                            className="px-8 py-2.5 bg-[#1CADA3] text-white font-semibold rounded-lg hover:bg-[#169c91] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md">
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            ) : "Save Changes"}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}