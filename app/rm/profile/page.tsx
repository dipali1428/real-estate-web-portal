"use client";

import { useEffect, useRef, useState } from "react";
import { RmService } from "../../services/rmService";
import toast from "react-hot-toast";

interface Profile {
    name: string;
    email: string;
    rm_referral: string;
    mobile: string;
    role: string;
    department: string;
    city: string;
    referral_code: string;
    sub_category: string;
    password?: string;
}
export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);

    const hasFetched = useRef(false);

    // FETCH ADMIN PROFILE
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await RmService.getRmProfile();
                setProfile(res.user);
            } catch (err) {
                console.error("Profile load error", err);
                toast.error("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Password strength checker
    const evaluatePassword = (pwd: string) => {
        if (!pwd) return setPasswordStrength("");
        if (pwd.length < 6) return setPasswordStrength("Weak");
        if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
            return setPasswordStrength("Medium");
        return setPasswordStrength("Strong");
    };

    if (loading || !profile)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                Loading profile...
            </div>
        );

    return (
        <main className="w-full px-4 py-6 min-h-screen">
            <section className="w-full bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
                        RelationShip Manager Profile
                    </h2>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 text-[#1CADA3] border border-[#1CADA3] rounded-lg hover:bg-[#1CADA3] hover:text-white transition">
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>

                {/* Form Container */}
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* REFERRAL CODE */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-[#1CADA3]">
                            Referral Code
                        </label>
                        <input
                            type="text"
                            disabled
                            value={profile.referral_code}
                            className="w-full mt-1 px-3 py-2 
                   bg-[#E6F7F5] 
                   border-2 border-[#1CADA3] 
                   rounded-lg 
                   text-[#0F766E] 
                   font-semibold 
                   ring-1 ring-[#1CADA3]/30"
                        />
                    </div>


                    {/* NAME */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            disabled
                            value={profile.name}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* DEPARTMENT */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Department</label>
                        <input
                            type="text"
                            disabled
                            value={profile.department}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* SUB CATEGORY */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Sub Category</label>
                        <input
                            type="text"
                            disabled
                            value={profile.sub_category}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* CITY */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">City</label>
                        <input
                            type="text"
                            disabled
                            value={profile.city}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* ROLE */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Role</label>
                        <input
                            type="text"
                            disabled
                            value={profile.role}
                            className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            disabled={!isEditing}
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg ${isEditing
                                ? "border border-[#1CADA3] bg-white text-gray-800"
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
                            value={profile.mobile}
                            onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg ${isEditing
                                ? "border border-[#1CADA3] bg-white text-gray-800"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                                }`}
                        />
                    </div>

                    {/* PASSWORD FIELD */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            disabled={!isEditing}
                            value={profile.password || ""}
                            onChange={(e) => {
                                evaluatePassword(e.target.value);
                                setProfile({ ...profile, password: e.target.value });
                            }}
                            placeholder="Enter new password"
                            className={`w-full mt-1 px-3 py-2 rounded-lg ${isEditing
                                ? "border border-[#1CADA3] bg-white text-gray-800"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                                }`}
                        />
                        {isEditing && (
                            <p className="text-xs mt-1 font-medium text-gray-600">
                                Password Strength: {passwordStrength}
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

                                    // await AdminService.updateAdminProfile(payload);

                                    toast.success("Profile updated successfully!");

                                    // const refreshed = await AdminService.getAdminProfile();
                                    // setProfile(refreshed.user);

                                    setIsEditing(false);
                                } catch (err: any) {
                                    toast.error(err?.response?.data?.message || "Failed to update profile.");
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            className="px-6 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#169c91] transition">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}
            </section>
        </main>

    );
}
