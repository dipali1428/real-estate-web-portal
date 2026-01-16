"use client";

import { useEffect, useRef, useState, useMemo } from "react"; // Added useMemo
import { DashboardService } from "@/app/services/dashboardService";
import toast from "react-hot-toast";
import CardTemplateImage from "@/app/assets/Bussiness_Card.png";

// --- Types & Constants ---
interface Profile {
    adv_id: string;
    name: string;
    email: string;
    mobile: string;
    pan: string;
    aadhaar?: string;
    gst_number?: string;
    city: string;
    head: string;
    category: string;
    password: string;
    bank_name?: string;
    branch_name?: string;
    bank_account?: string;
    ifsc?: string;
}

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: ["Mutual Funds", "Wealth Management", "Pension Funds", "Stocks and Securities", "Portfolio Management Services", "Real Estate Investments", "Unlisted Shares"],
    Protection: ["Life Insurance", "Health Insurance", "Motor Insurance", "Travel Insurance", "Corporate General Insurance"],
    Finance: ["Home Finance", "Personal Finance", "SME Finance", "EMI Solution", "Loan Against Securities", "Corporate Finance", "Mortgage Finance", "Debt Capital Market & Loan Syndication", "Asset Reconstruction", "Tax Consultancy", "Education Loan", "Business Loan"],
};

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const hasFetched = useRef(false);

    // Verification States
    const [panVerified, setPanVerified] = useState(false);
    const [aadhaarVerified, setAadhaarVerified] = useState(false);
    const [gstVerified, setGstVerified] = useState(false);

    const [panFile, setPanFile] = useState<File | null>(null);
    const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
    const [gstFile, setGstFile] = useState<File | null>(null);

    const [uploadingPan, setUploadingPan] = useState(false);
    const [uploadingAadhaar, setUploadingAadhaar] = useState(false);
    const [uploadingGst, setUploadingGst] = useState(false);

    // --- PROFILE COMPLETION LOGIC ---
    const completionData = useMemo(() => {
        if (!profile) return { percentage: 0, color: "bg-slate-200" };

        const fields = [
            { key: profile.email, weight: 10 },
            { key: profile.mobile, weight: 10 },
            { key: profile.city, weight: 5 },
            { key: profile.pan, weight: 10 },
            { key: profile.aadhaar, weight: 10 },
            { key: profile.gst_number, weight: 5 },
            { key: profile.head, weight: 10 },
            { key: profile.category, weight: 10 },
            { key: profile.password, weight: 5 },
            { key: profile.bank_name, weight: 5 },
            { key: profile.bank_account, weight: 10 },
            { key: profile.ifsc, weight: 10 },
        ];

        // Name and Adv_ID are assumed present from initial registration (Base 10%)
        let score = 0;
        fields.forEach(f => { if (f.key && f.key.toString().trim() !== "") score += f.weight; });
        
        const percentage = Math.min(score, 100);
        let color = "bg-rose-500";
        if (percentage > 40) color = "bg-[#2076C7]";
        if (percentage > 75) color = "bg-[#2076C7]";
        if (percentage === 100) color = "bg-[#2076C7]";

        return { percentage, color };
    }, [profile]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
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

    // --- Logic Handlers (Unchanged) ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pan' | 'aadhaar' | 'gst') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'pan') { setPanFile(file); setPanVerified(false); }
            else if (type === 'aadhaar') { setAadhaarFile(file); setAadhaarVerified(false); }
            else if (type === 'gst') { setGstFile(file); setGstVerified(false); }
        }
    };

    const handleUploadAndVerify = async (type: 'pan' | 'aadhaar' | 'gst') => {
        const file = type === 'pan' ? panFile : type === 'aadhaar' ? aadhaarFile : gstFile;
        if (!file) return toast.error(`Please select a ${type.toUpperCase()} file first.`);
        const setUploading = type === 'pan' ? setUploadingPan : type === 'aadhaar' ? setUploadingAadhaar : setUploadingGst;
        const setVerified = type === 'pan' ? setPanVerified : type === 'aadhaar' ? setAadhaarVerified : setGstVerified;
        try {
            setUploading(true);
            const toastId = toast.loading(`Uploading & Verifying ${type.toUpperCase()}...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setVerified(true);
            toast.success(`${type.toUpperCase()} Verified Successfully!`, { id: toastId });
        } catch (error) { toast.error(`Failed to verify.`); } finally { setUploading(false); }
    };

    const toggleHead = (head: string) => {
        if (!profile) return;
        const selectedHeads = profile.head ? profile.head.split(",") : [];
        let updatedHeads = selectedHeads.includes(head) ? selectedHeads.filter((h) => h !== head) : [...selectedHeads, head];
        const selectedCats = profile.category ? profile.category.split(",") : [];
        const allowedCats = updatedHeads.flatMap((h) => CATEGORY_MAP[h] || []);
        const prunedCategories = selectedCats.filter((c) => allowedCats.includes(c));
        setProfile({ ...profile, head: updatedHeads.join(","), category: prunedCategories.join(",") });
    };

    const toggleCategory = (cat: string) => {
        if (!profile) return;
        const selectedCats = profile.category ? profile.category.split(",") : [];
        const updated = selectedCats.includes(cat) ? selectedCats.filter((c) => c !== cat) : [...selectedCats, cat];
        setProfile({ ...profile, category: updated.join(",") });
    };

    const handleAccountChange = (val: string, index: number) => {
        if (!profile) return;
        const digits = val.replace(/\D/g, "");
        if (val !== "" && digits === "") return;
        if (digits.length > 1) {
            const fullNumber = digits.slice(0, 12);
            setProfile({ ...profile, bank_account: fullNumber });
            const nextIdx = Math.min(fullNumber.length, 11);
            document.getElementById(`acc-${nextIdx}`)?.focus();
            return;
        }
        const currentAcc = (profile.bank_account || "").padEnd(12, " ").split("");
        currentAcc[index] = digits;
        const newAcc = currentAcc.join("").trimEnd();
        setProfile({ ...profile, bank_account: newAcc });
        if (digits && index < 11) document.getElementById(`acc-${index + 1}`)?.focus();
    };

    const downloadCardAsPhoto = async () => {
        if (!profile) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const cvWidth = 1200;
        const cvHeight = 675;
        canvas.width = cvWidth; canvas.height = cvHeight;
        try {
            const templateImg = new Image();
            templateImg.src = CardTemplateImage.src; templateImg.crossOrigin = "anonymous";
            await new Promise((resolve, reject) => { templateImg.onload = resolve; templateImg.onerror = reject; });
            ctx.drawImage(templateImg, 0, 0, cvWidth, cvHeight);
            const leftPadding = 90; const iconColor = "#94a3b8"; const textColor = "#1e293b";
            ctx.fillStyle = textColor; ctx.font = "bold 52px sans-serif"; ctx.textBaseline = "top";
            ctx.fillText(profile.name.toUpperCase(), leftPadding, 180);
            ctx.fillStyle = "#64748b"; ctx.font = "20px sans-serif"; ctx.fillText("CERTIFIED FINANCIAL ADVISOR", leftPadding, 240);
            const drawIcon = (path: string, x: number, y: number) => {
                ctx.save(); ctx.translate(x, y); ctx.strokeStyle = iconColor; ctx.lineWidth = 2.5;
                ctx.lineCap = "round"; ctx.lineJoin = "round"; const p = new Path2D(path); ctx.stroke(p); ctx.restore();
            };
            const startY = 320; const gap = 75; const textXOffset = 60;
            drawIcon("M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2  17 2ZM12 18H12.01", leftPadding, startY);
            ctx.fillStyle = textColor; ctx.font = "bold 28px sans-serif"; ctx.fillText(`+91 ${profile.mobile}`, leftPadding + textXOffset, startY - 5);
            drawIcon("M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM22 7L12 13L2 7", leftPadding, startY + gap);
            ctx.font = "500 26px sans-serif"; ctx.fillText(profile.email.toLowerCase(), leftPadding + textXOffset, startY + gap - 5);
            drawIcon("M12 21C12 21 20 13 20 8C20 3.58172 16.4183 0 12 0C7.58172 0 4 3.58172 4 8C4 13 12 21 12 21ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z", leftPadding, startY + (gap * 2));
            ctx.font = "bold 28px sans-serif"; ctx.fillText(profile.city, leftPadding + textXOffset, startY + (gap * 2) - 5);
            ctx.fillStyle = iconColor; ctx.font = "bold 20px sans-serif"; ctx.fillText("AUTHORIZED PARTNER", leftPadding, cvHeight - 80);
            const link = document.createElement("a"); link.download = `${profile.name}_BusinessCard.jpg`;
            link.href = canvas.toDataURL("image/jpeg", 1.0); link.click();
            toast.success("Card downloaded successfully!");
        } catch (e) { toast.error("Template failed to load."); }
    };

    if (loading || !profile) return (
        <div className="flex flex-col gap-4 justify-center items-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading your profile...</p>
        </div>
    );

    const selectedHeads = profile.head ? profile.head.split(",") : [];
    const selectedCats = profile.category ? profile.category.split(",") : [];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#f8fafc]">
            {/* --- TOP HEADER & PROGRESS BAR --- */}
            <div className="flex flex-col gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Profile Settings</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your advisor identity and professional credentials.</p>
                    </div>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                            isEditing ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-[#1CADA3] text-white shadow-md shadow-[#1cada340]"
                        }`}
                    >
                        {isEditing ? "✕ Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* --- PROFESSIONAL COMPLETION BAR --- */}
                <div className="space-y-2 pt-4 border-t border-slate-50">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile Completion</span>
                        <span className={`text-sm font-black ${completionData.percentage === 100 ? "text-emerald-500" : "text-slate-600"}`}>
                            {completionData.percentage}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                        <div 
                            className={`h-full transition-all duration-700 ease-out rounded-full ${completionData.color}`} 
                            style={{ width: `${completionData.percentage}%` }}
                        />
                    </div>
                    {completionData.percentage < 100 && (
                        <p className="text-[10px] text-slate-400 font-medium">
                            Complete your bank details and GST to reach 100% visibility.
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- LEFT COLUMN: FORM SECTIONS --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* BASIC IDENTITY */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                            <h3 className="font-bold text-slate-800">Basic Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">Advisor ID</label><input disabled value={profile.adv_id} className="w-full px-4 py-2.5 bg-slate-50 border-none text-slate-600 rounded-xl font-medium" /></div>
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">Full Name</label><input readOnly value={profile.name} className="w-full px-4 py-2.5 bg-slate-50 border-none text-slate-600 rounded-xl font-bold" /></div>
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">Email</label><input disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={`w-full px-4 py-2.5 text-slate-700 rounded-xl transition-all ${isEditing ? "bg-white border-2  border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">Mobile</label><input disabled={!isEditing} value={profile.mobile} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className={`w-full px-4 py-2.5 text-slate-700 rounded-xl transition-all ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            <div className="space-y-1.5 md:col-span-2"><label className="text-[13px] font-semibold text-slate-500 ml-1">City</label><input readOnly value={profile.city} className="w-full px-4 py-2.5 bg-slate-50 text-slate-800 rounded-xl font-medium" /></div>
                        </div>
                    </div>

                    {/* PROFESSIONAL EXPERTISE */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                            <h3 className="font-bold text-slate-800">Professional Expertise</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[13px] font-bold text-slate-400 uppercase mb-3 block">Head Categories</label>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(CATEGORY_MAP).map((head) => (
                                        <button key={head} type="button" disabled={!isEditing} onClick={() => toggleHead(head)} className={`px-4 py-2 text-sm font-bold rounded-xl border-2 transition-all ${selectedHeads.includes(head) ? "bg-green-50 border-[#1CADA3] text-[#1CADA3]" : "bg-slate-50 border-transparent text-slate-400"}`}>{head}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[13px] font-bold text-slate-400 uppercase mb-3 block">Sub Categories</label>
                                {selectedHeads.length === 0 ? <div className="p-4 bg-slate-50 rounded-xl text-slate-400 text-sm">Select head category first.</div> : (
                                    <div className="space-y-5">
                                        {selectedHeads.map((head) => (
                                            <div key={head} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                                <p className="font-bold text-slate-700 text-xs uppercase mb-3 px-1">{head}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(CATEGORY_MAP[head] ?? []).map((cat) => (
                                                        <button key={cat} type="button" disabled={!isEditing} onClick={() => toggleCategory(cat)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${selectedCats.includes(cat) ? "bg-white border-[#1CADA3] text-[#1CADA3] shadow-sm" : "bg-white border-slate-200 text-slate-500"}`}>{cat}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* IDENTITY VERIFICATION */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                            <h3 className="font-bold text-slate-800">Identity Verification</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">PAN Card</label><div className="relative"><input disabled value={profile.pan} className="w-full px-4 py-2.5 bg-slate-50 text-slate-800 rounded-xl font-bold uppercase tracking-widest" /><div className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-black uppercase ${panVerified ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>{panVerified ? "Verified ✓" : "Pending"}</div></div></div>
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">Aadhaar</label><div className="relative"><input disabled={!isEditing} maxLength={12} value={profile.aadhaar || ""} onChange={(e) => setProfile({ ...profile, aadhaar: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl font-bold tracking-[0.2em] ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /><div className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-black uppercase ${aadhaarVerified ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>{aadhaarVerified ? "Verified ✓" : "Pending"}</div></div></div>
                            <div className="space-y-1.5"><label className="text-[13px] font-semibold text-slate-500 ml-1">GST Number</label><div className="relative"><input disabled={!isEditing} maxLength={15} value={profile.gst_number || ""} onChange={(e) => setProfile({ ...profile, gst_number: e.target.value.toUpperCase() })} placeholder="" className={`w-full px-4 py-2.5 text-gray-700 rounded-xl font-bold tracking-widest ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /><div className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-black uppercase ${gstVerified ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>{gstVerified ? "Verified ✓" : "Not Verified"}</div></div></div>
                            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${panFile ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 text-gray-500 bg-slate-50/30"}`}>
                                    <p className="text-[11px] font-black text-slate-600 uppercase mb-3">PAN Document</p>
                                    <input type="file" disabled={!isEditing || uploadingPan} accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'pan')} className="text-xs w-full cursor-pointer" />
                                    {panFile && !panVerified && isEditing && <button onClick={() => handleUploadAndVerify('pan')} className="mt-4 w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl">{uploadingPan ? "Processing..." : "Verify PAN"}</button>}
                                </div>
                                <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${aadhaarFile ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 text-gray-500 bg-slate-50/30"}`}>
                                    <p className="text-[11px] font-black text-slate-600 uppercase mb-3">Aadhaar Document</p>
                                    <input type="file" disabled={!isEditing || uploadingAadhaar} accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'aadhaar')} className="text-xs w-full cursor-pointer" />
                                    {aadhaarFile && !aadhaarVerified && isEditing && <button onClick={() => handleUploadAndVerify('aadhaar')} className="mt-4 w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl">{uploadingAadhaar ? "Processing..." : "Verify Aadhaar"}</button>}
                                </div>
                                <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${gstFile ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 text-gray-500 bg-slate-50/30"}`}>
                                    <p className="text-[11px] font-black text-slate-600 uppercase mb-3">GST Certificate</p>
                                    <input type="file" disabled={!isEditing || uploadingGst} accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'gst')} className="text-xs w-full cursor-pointer" />
                                    {gstFile && !gstVerified && isEditing && <button onClick={() => handleUploadAndVerify('gst')} className="mt-4 w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl">{uploadingGst ? "Processing..." : "Verify GST"}</button>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BANK DETAILS */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
        <h3 className="font-bold text-slate-800">Bank Details</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Name */}
        <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-500 ml-1">Bank Name</label>
            <input 
                disabled={!isEditing} 
                value={profile.bank_name || ""} 
                placeholder="" 
                onChange={(e) => setProfile({ ...profile, bank_name: e.target.value })} 
                className={`w-full px-4 py-2.5 rounded-xl text-gray-700 transition-all font-bold ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} 
            />
        </div>

        {/* Branch Name - Added Here */}
        <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-500 ml-1">Branch Name</label>
            <input 
                disabled={!isEditing} 
                value={profile.branch_name || ""} 
                placeholder="" 
                onChange={(e) => setProfile({ ...profile, branch_name: e.target.value })} 
                className={`w-full px-4 py-2.5 rounded-xl text-gray-700 transition-all font-bold ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} 
            />
        </div>

        {/* Account Number */}
        <div>
            <label className="text-[13px] font-semibold text-slate-500 mb-2 block ml-1">Account Number</label>
            <div className={`flex items-center w-fit border-2 rounded-xl overflow-hidden ${isEditing ? "border-[#1CADA3]" : "border-slate-100 bg-slate-50"}`}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <input 
                        key={i} 
                        id={`acc-${i}`} 
                        type="text" 
                        inputMode="numeric" 
                        maxLength={i === 0 ? 12 : 1} 
                        disabled={!isEditing} 
                        value={profile.bank_account?.[i] || ""} 
                        onChange={(e) => handleAccountChange(e.target.value, i)} 
                        onKeyDown={(e) => { if (e.key === "Backspace" && !profile.bank_account?.[i] && i > 0) document.getElementById(`acc-${i - 1}`)?.focus(); }} 
                        className={`w-7 h-10 sm:w-8 sm:h-11 text-center text-sm font-mono font-bold outline-none border-r border-slate-100 last:border-r-0 ${isEditing ? "text-[#1CADA3]" : "text-slate-500"} bg-transparent`} 
                    />
                ))}
            </div>
        </div>

        {/* IFSC Code */}
        <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-500 ml-1">IFSC Code</label>
            <input 
                disabled={!isEditing} 
                value={profile.ifsc || ""} 
                placeholder="" 
                onChange={(e) => setProfile({ ...profile, ifsc: e.target.value.toUpperCase() })} 
                className={`w-full px-4 py-2.5 h-[44px] rounded-xl text-gray-700 transition-all font-bold tracking-widest ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} 
            />
        </div>
    </div>
</div>

                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <button disabled={saving} onClick={async () => {
                                try { setSaving(true); await DashboardService.editProfile(profile); toast.success("Profile updated!"); setIsEditing(false); } catch (err: any) { toast.error("Failed to update."); } finally { setSaving(false); }
                            }} className="px-10 py-4 bg-[#1CADA3] text-white rounded-2xl shadow-xl hover:bg-[#168b83] font-bold">
                                {saving ? "Saving Changes..." : "Save All Changes"}
                            </button>
                        </div>
                    )}
                </div>

                {/* --- RIGHT COLUMN: ID CARD PREVIEW --- */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 self-start">
                    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Digital Visiting Card</h4>
                        <div className="w-full aspect-[1.75/1] rounded-2xl shadow-2xl overflow-hidden relative border border-slate-200 bg-slate-900 group select-none">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${CardTemplateImage.src})` }} />
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                <div><h4 className="text-[1.1rem] font-black text-slate-800 uppercase leading-none tracking-tight truncate">{profile.name || "YOUR NAME"}</h4><p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Certified Financial Advisor</p></div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg><span className="text-[11px] font-bold text-slate-700 tracking-wide">+91 {profile.mobile}</span></div>
                                    <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><span className="text-[9px] font-medium text-slate-800 truncate">{profile.email.toLowerCase()}</span></div>
                                    <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span className="text-[11px] font-bold text-slate-700">{profile.city}</span></div>
                                </div>
                                <div className="pt-2 border-t border-slate-200/50"><span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized Partner</span></div>
                            </div>
                        </div>
                        <button onClick={downloadCardAsPhoto} className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl hover:bg-black font-bold text-sm transition-all shadow-lg active:scale-95">Download Card</button>
                    </div>
                </div>
            </div>
        </main>
    );
}