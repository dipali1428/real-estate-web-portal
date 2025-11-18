"use client";

import { useEffect, useState } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import toast, { Toaster } from "react-hot-toast";

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

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: [
        "Mutual Funds",
        "Wealth Management",
        "Pension Funds",
        "Stocks and Securities",
        "Portfolio Management Services",
        "Real Estate Investments",
        "Unlisted Shares",
    ],
    Protection: [
        "Life Insurance",
        "Health Insurance",
        "Motor Insurance",
        "Travel Insurance",
        "Corporate General Insurance",
    ],
    Finance: [
        "Home Finance",
        "Personal Finance",
        "SME Finance",
        "EMI Solution",
        "Loan Against Securities",
        "Corporate Finance",
        "Mortgage Finance",
        "Debt Capital Market & Loan Syndication",
        "Asset Reconstruction",
        "Tax Consultancy",
        "Education Loan",
        "Business Loan",
    ],
};

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await DashboardService.getProfile();
                setProfile(res.user);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const evaluatePassword = (pwd: string) => {
        if (!pwd) return setPasswordStrength("");

        if (pwd.length < 6) return setPasswordStrength("Weak");
        if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
            return setPasswordStrength("Medium");

        return setPasswordStrength("Strong");
    };

    const toggleHead = (head: string) => {
        if (!profile) return;

        const selectedHeads = profile.head ? profile.head.split(",") : [];

        let updatedHeads = selectedHeads.includes(head)
            ? selectedHeads.filter((h) => h !== head)
            : [...selectedHeads, head];

        // Remove categories belonging to unselected heads
        const selectedCats = profile.category ? profile.category.split(",") : [];
        const allowedCats = updatedHeads.flatMap((h) => CATEGORY_MAP[h] || []);

        const prunedCategories = selectedCats.filter((c) =>
            allowedCats.includes(c)
        );

        setProfile({
            ...profile,
            head: updatedHeads.join(","),
            category: prunedCategories.join(",")
        });
    };

    const toggleCategory = (cat: string) => {
        if (!profile) return;

        const selectedCats = profile.category ? profile.category.split(",") : [];

        const updated =
            selectedCats.includes(cat)
                ? selectedCats.filter((c) => c !== cat)
                : [...selectedCats, cat];

        setProfile({ ...profile, category: updated.join(",") });
    };

    if (loading || !profile)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                Loading profile...
            </div>
        );

    const selectedHeads = profile.head ? profile.head.split(",") : [];
    const selectedCats = profile.category ? profile.category.split(",") : [];

    return (
        <main className="w-full px-0 sm:px-2 lg:px-6 py-4 min-h-screen">
            <Toaster />

            <section className="w-full md:mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-6">
                {/* Header */}
                <div className="flex justify-between mb-6">
                    <h2 className="text-3xl font-bold text-slate-700">Profile Information</h2>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-5 py-2 text-[#1CADA3] border border-[#1CADA3] rounded-lg cursor-pointer hover:bg-blue-400 hover:text-white">
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* READ ONLY FIELDS */}
                    {[
                        { label: "Advisor ID", key: "adv_id" },
                        { label: "Name", key: "name" },
                        { label: "PAN Number", key: "pan" },
                        { label: "City", key: "city" },
                    ].map((f) => (
                        <div key={f.key}>
                            <label className="text-sm text-gray-700">{f.label}</label>
                            <input
                                type="text"
                                value={(profile as any)[f.key]}
                                disabled
                                className="w-full px-3 py-2 text-gray-800 rounded-lg bg-gray-200"
                            />
                        </div>
                    ))}

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-gray-700">Email</label>
                        <input
                            disabled={!isEditing}
                            value={profile.email}
                            onChange={(e) =>
                                setProfile({ ...profile, email: e.target.value })
                            }
                            className={`w-full px-3 py-2 text-gray-800 rounded-lg ${isEditing ? "border-[#1CADA3]" : "bg-gray-200"}`}
                        />
                    </div>

                    {/* MOBILE */}
                    <div>
                        <label className="text-sm text-gray-700">Mobile</label>
                        <input
                            disabled={!isEditing}
                            value={profile.mobile}
                            onChange={(e) =>
                                setProfile({ ...profile, mobile: e.target.value })
                            }
                            className={`w-full px-3 py-2 text-gray-800 rounded-lg ${isEditing ? "border-[#1CADA3]" : "bg-gray-200"}`}
                        />
                    </div>

                    {/* MULTI SELECT HEAD */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700 mb-2 block">Head Category</label>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(CATEGORY_MAP).map((head) => (
                                <button
                                    key={head}
                                    type="button"
                                    disabled={!isEditing}
                                    onClick={() => toggleHead(head)}
                                    className={`px-4 py-1 rounded-full border ${selectedHeads.includes(head)
                                        ? "bg-[#cee9fd] text-[#006dda]"
                                        : "bg-gray-100 text-gray-500"
                                        }`}>
                                    {head}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MULTI SELECT CATEGORY (filtered by heads) */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700 mb-2 block">Category</label>

                        {selectedHeads.length === 0 ? (
                            <p className="text-gray-500">Select head category first.</p>
                        ) : (
                            selectedHeads.map((head) => (
                                <div key={head} className="mb-4">
                                    <p className="font-semibold text-gray-700">{head}</p>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {CATEGORY_MAP[head].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                disabled={!isEditing}
                                                onClick={() => toggleCategory(cat)}
                                                className={`px-4 py-1 rounded-full border ${selectedCats.includes(cat)
                                                    ? "bg-[#cee9fd] text-[#006dda]"
                                                    : "bg-gray-100 text-gray-500"
                                                    }`}>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* PASSWORD WITH STRENGTH */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700">Update Password</label>
                        <input
                            type="password"
                            disabled={!isEditing}
                            value={profile.password}
                            onChange={(e) => {
                                setProfile({ ...profile, password: e.target.value });
                                evaluatePassword(e.target.value);
                            }}
                            className={`w-full px-3 py-2 border text-gray-700 rounded-lg ${isEditing ? "border-[#1CADA3]" : "bg-gray-100"
                                }`}
                        />
                        {isEditing && (
                            <p className="text-sm text-gray-600 mt-1">{passwordStrength}</p>
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
                                        head: profile.head,
                                        category: profile.category,
                                        password: profile.password,
                                    };

                                    await DashboardService.editProfile(payload);
                                    toast.success("Profile updated successfully!");

                                    const refreshed = await DashboardService.getProfile();
                                    setProfile(refreshed.user);

                                    setIsEditing(false);
                                } catch (err: any) {
                                    toast.error(
                                        err?.response?.data?.message ||
                                        "Failed to update profile."
                                    );
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            className="px-6 py-2 bg-[#1CADA3] text-white rounded-lg shadow">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
