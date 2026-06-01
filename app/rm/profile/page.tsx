"use client";

import { useEffect, useRef, useState } from "react";
import { RmService } from "../../services/rmService";
import toast from "react-hot-toast";
import { DashboardService } from "@/app/services/dashboardService";
import { Loader2, Globe, Copy, Share2 } from "lucide-react";

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
    const [referralLink, setReferralLink] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);

    const hasFetched = useRef(false);

    const triggerPopup = (msg: string, type: "success" | "error") => {
        if (type === "success") toast.success(msg);
        else toast.error(msg);
    };

    const handleShareReferral = async () => {
        let currentLink = referralLink;
        try {
            setIsGeneratingLink(true);
            const res = await DashboardService.getRefLink();
            if (res.referral_link) {
                currentLink = res.referral_link;
                setReferralLink(res.referral_link);
                setReferralCode(res.referral_code);
            }
        } catch (e) {
            triggerPopup("Failed to prepare referral link", "error");
            return;
        } finally {
            setIsGeneratingLink(false);
        }

        if (navigator.share && currentLink) {
            try {
                await navigator.share({
                    title: 'Join Infinity Arthvishva',
                    text: 'Become a partner with Infinity Arthvishva.',
                    url: currentLink,
                });
            } catch (err) {
                toast.error("Sharing failed or cancelled.");
            }
        } else if (currentLink) {
            handleCopyReferral();
        }
    };

    const handleGenerateReferral = async () => {
        try {
            setIsGeneratingLink(true);
            const res = await DashboardService.getRefLink();
            const link = res.referral_link;
            const code = res.referral_code;

            if (link && code) {
                setReferralLink(link);
                setReferralCode(code);
                triggerPopup("Referral link generated!", "success");
            } else {
                throw new Error("Link not found in response");
            }
        } catch (e) {
            triggerPopup("Failed to generate link", "error");
        } finally {
            setIsGeneratingLink(false);
        }
    };

    const handleCopyReferral = () => {
        if (!referralLink) {
            triggerPopup("No link to copy!", "error");
            return;
        }
        navigator.clipboard.writeText(referralLink);
        triggerPopup("Referral link copied!", "success");
    };

    // Update useEffect to set initial referral code if available
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await RmService.getRmProfile();
                setProfile(res.user);
                // Set the code from profile if it exists
                if (res.user.referral_code) setReferralCode(res.user.referral_code);
            } catch (err) {
                toast.error("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

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
        <main className="w-full px-4 py-6 min-h-screen max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[24px] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                        <h4 className="text-[13px] font-bold uppercase text-[#ffffff] tracking-widest mb-2">Referral Program</h4>
                        <p className="text-[13px] font-sans text-white font-medium mb-6">Refer your DSA to this platform.</p>

                        <div className="space-y-4">
                            {!referralLink && !profile.referral_code ? (
                                <button
                                    type="button"
                                    onClick={handleGenerateReferral}
                                    disabled={isGeneratingLink}
                                    className="w-full py-3.5 bg-white text-[#1CADA3] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50"
                                >
                                    {isGeneratingLink ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                                    Generate Referral Link
                                </button>
                            ) : (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col gap-3">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Your Referral Code</span>
                                            <p className="text-[16px] font-mono font-medium text-slate-600 truncate">
                                                {referralCode || profile.referral_code}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={handleCopyReferral}
                                                className="flex-1 py-2 px-3 text-slate-500 bg-slate-50 hover:text-[#1CADA3] rounded-lg transition-all border border-slate-100 flex justify-center items-center gap-2 text-sm font-medium"
                                            >
                                                <Copy size={16} /> Copy
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isGeneratingLink}
                                                onClick={handleShareReferral}
                                                className="p-3 bg-[#1CADA3] text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                                            >
                                                {isGeneratingLink ? <Loader2 size={20} className="animate-spin" /> : <Share2 size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
                <section className="lg:col-span-8 bg-white rounded-2xl shadow-lg p-6">

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

                                        await RmService.updateRmProfile(payload);

                                        toast.success("Profile updated successfully!");

                                        const refreshed = await RmService.getRmProfile();
                                        setProfile(refreshed.user);

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
            </div>
        </main>

    );
}
