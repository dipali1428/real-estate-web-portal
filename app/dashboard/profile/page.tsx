"use client";

import { useEffect, useRef, useState } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import toast from "react-hot-toast";
import CardTemplateImage from "@/app/assets/Bussiness_Card2.png";
import { Phone, Mail, MapPin, Globe, Landmark, Pencil, CheckCircle2, AlertCircle, Loader2, Camera } from "lucide-react";
import LogoImage from "@/public/logo.png";

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
    state: string;
    head: string;
    category: string;
    password: string;
    bank_name?: string;
    branch_name?: string;
    bank_account?: string;
    ifsc?: string;
    pan_verified: boolean;
    profile_photo?: any; 
}

interface KycDetails {
    bank_name?: string;
    bank_account_number?: string;
    ifsc_code?: string;
    bank_verified: boolean;
    aadhaar_number?: string;
    aadhaar_verified: boolean;
    gst_number?: string;
    gst_verified: boolean;
    kyc_completed: boolean;
    profile_image_url?: string;
}

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: ["Mutual Funds", "Wealth Management", "Pension Funds", "Stocks and Securities", "Portfolio Management Services", "Real Estate Investments", "Unlisted Shares"],
    Protection: ["Life Insurance", "Health Insurance", "Motor Insurance", "Travel Insurance", "Cattle Insurance", "Marine Insurance", "Corporate Insurance"],
    Finance: ["Home Finance", "Personal Finance", "SME Finance", "EMI Solution", "Loan Against Securities", "Corporate Finance", "Mortgage Finance", "Debt Capital Market & Loan Syndication", "Asset Reconstruction", "Tax Consultancy", "Education Loan", "Business Loan"],
};

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false); 
    const [profile, setProfile] = useState<Profile | null>(null);
    const [kyc, setKyc] = useState<KycDetails | null>(null);
    const [imageTimestamp, setImageTimestamp] = useState(Date.now()); 

    const originalPassword = useRef<string>("");
    const hasFetched = useRef(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [bankVerified, setBankVerified] = useState<boolean>(false);
    const [verifyingBank, setVerifyingBank] = useState<boolean>(false);
    const [isBankEditing, setIsBankEditing] = useState(false);
    const [bankDraft, setBankDraft] = useState<any>(null);

    const [aadhaarVerified, setAadhaarVerified] = useState(false);
    const [gstVerified, setGstVerified] = useState(false);

    const [isDownloadingCard, setIsDownloadingCard] = useState(false);
    const [isDownloadingDSACard, setIsDownloadingDSACard] = useState(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await DashboardService.getProfile();
                setProfile(res.user);
                setKyc(res.kycDetails);
                if (res.kycDetails?.bank_verified) setBankVerified(true);
                originalPassword.current = res.user.password;
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleBankVerification = async () => {
        if (!profile?.bank_account || !profile?.ifsc) {
            return toast.error("Please enter Account Number & IFSC");
        }
        let toastId: string | undefined;
        try {
            setVerifyingBank(true);
            toastId = toast.loading("Verifying bank details...");
            const res = await DashboardService.verifyBankDetails({
                bank_account_number: profile.bank_account,
                ifsc_code: profile.ifsc,
                bank_name: profile.bank_name,
            });
            if (res.status === "success") {
                setBankVerified(true);
                setProfile((prev) => prev ? { ...prev, bank_name: res.data.bank_name } : prev);
                toast.success("Bank verified successfully!", { id: toastId });
            } else {
                toast.error(res.message || "Bank verification failed", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Unable to verify", { id: toastId });
        } finally {
            setVerifyingBank(false);
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localBlob = URL.createObjectURL(file);
        setPhotoPreview(localBlob);

        const formData = new FormData();
        formData.append("profile_photo", file);

        let toastId: string | undefined;
        try {
            setUploadingPhoto(true);
            toastId = toast.loading("Updating profile picture...");
            
            const res = await DashboardService.updateProfileImage(formData);
            
                if (res.profile_image_url) {
                const newTimestamp = Date.now();
                setImageTimestamp(newTimestamp);
                const freshUrl = `${res.profile_image_url}?t=${newTimestamp}`;

                setKyc(prev => prev ? { 
                    ...prev, 
                    profile_image_url: freshUrl 
                } : prev);

                setTimeout(() => setPhotoPreview(null), 500);
                toast.success("Profile picture updated!", { id: toastId });
            } else {
                setPhotoPreview(null);
                toast.error("Failed to update image", { id: toastId });
            }
        } catch (err: any) {
            setPhotoPreview(null);
            toast.error("Error uploading image", { id: toastId });
        } finally {
            setUploadingPhoto(false);
        }
    };

    const getProfileImage = () => {
        if (photoPreview) return photoPreview;
        return kyc?.profile_image_url || null;
    };

    const downloadCardAsPhoto = async () => {
        if (!profile) return;
        setIsDownloadingCard(true);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return setIsDownloadingCard(false);
        canvas.width = 1200; canvas.height = 675;
        try {
            const templateImg = new Image();
            templateImg.src = CardTemplateImage.src; templateImg.crossOrigin = "anonymous";
            await new Promise((res, rej) => { templateImg.onload = res; templateImg.onerror = rej; });
            ctx.drawImage(templateImg, 0, 0, 1200, 675);
            const leftPadding = 90; ctx.textBaseline = "top";
            ctx.fillStyle = "#1e293b"; ctx.font = "bold 52px sans-serif";
            ctx.fillText(profile.name.toUpperCase(), leftPadding, 180);
            ctx.fillStyle = "#64748b"; ctx.font = "bold 20px sans-serif";
            ctx.fillText("AUTHORIZED PARTNER", leftPadding, 240);
            const drawIcon = (path: string, x: number, y: number) => {
                ctx.save(); ctx.translate(x, y); ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 2.5;
                ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke(new Path2D(path)); ctx.restore();
            };
            const startY = 320; const gap = 70; const textX = leftPadding + 60;
            ctx.fillStyle = "#334155"; ctx.font = "bold 28px sans-serif";
            drawIcon("M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2Z", leftPadding, startY);
            ctx.fillText(`+91 ${profile.mobile}`, textX, startY - 4);
            drawIcon("M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM22 7L12 13L2 7", leftPadding, startY + gap);
            ctx.font = "bold 26px sans-serif"; ctx.fillText(profile.email.toLowerCase(), textX, startY + gap - 4);
            drawIcon("M12 21C12 21 20 13 20 8C20 3.6 16.4 0 12 0C7.6 0 4 3.6 4 8C4 13 12 21 12 21Z", leftPadding, startY + gap * 2);
            ctx.font = "bold 28px sans-serif"; ctx.fillText(profile.city, textX, startY + gap * 2 - 4);
            const link = document.createElement("a"); link.download = `${profile.name}_BusinessCard.jpg`;
            link.href = canvas.toDataURL("image/jpeg", 1); link.click();
            toast.success("Card downloaded successfully!");
        } catch (err) { toast.error("Failed to generate card."); } finally { setIsDownloadingCard(false); }
    };

    const downloadDSACardAsPhoto = async () => {
        if (!profile) return;
        setIsDownloadingDSACard(true);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return setIsDownloadingDSACard(false);

        const cvWidth = 600;
        const cvHeight = 950;
        canvas.width = cvWidth;
        canvas.height = cvHeight;

        try {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cvWidth, cvHeight);

            // Header/Footer Teal Bars
            ctx.fillStyle = "#1CADA3";
            ctx.fillRect(0, 0, cvWidth, 15);
            ctx.fillRect(0, cvHeight - 15, cvWidth, 15);

            // Logo
            const logo = new Image();
            logo.src = LogoImage.src; logo.crossOrigin = "anonymous";
            await new Promise((res) => { logo.onload = res; logo.onerror = res; });
            if (logo.complete) {
                const logoW = 200; const logoH = 60;
                ctx.drawImage(logo, (cvWidth - logoW) / 2, 60, logoW, logoH);
            }

            // Photo Frame (Centered)
            const photoX = (cvWidth - 220) / 2;
            const photoY = 180;
            const activeImg = getProfileImage();
            if (activeImg) {
                const userPhoto = new Image();
                userPhoto.src = activeImg;
                userPhoto.crossOrigin = "anonymous";
                await new Promise((res) => { userPhoto.onload = res; userPhoto.onerror = res; });
                if (userPhoto.complete) {
                    ctx.drawImage(userPhoto, photoX, photoY, 220, 260);
                }
            } else {
                ctx.strokeStyle = "#slate-200"; ctx.strokeRect(photoX, photoY, 220, 260);
            }

            // Name & Titles (Centered)
            ctx.textAlign = "center";
            ctx.fillStyle = "#2563eb"; 
            ctx.font = "bold 38px sans-serif";
            ctx.fillText(profile.name.toUpperCase(), cvWidth / 2, 520);

            ctx.fillStyle = "#64748b";
            ctx.font = "bold 24px sans-serif";
            ctx.fillText("Authorized Partner", cvWidth / 2, 560);

            ctx.fillStyle = "#334155";
            ctx.font = "bold 24px sans-serif";
            ctx.fillText(`Partner ID - ${profile.adv_id}`, cvWidth / 2, 600);

            // Centered Details Section
            const detailsStartY = 680;
            ctx.font = "bold 20px sans-serif";
            ctx.fillText(`Contact No: +91 ${profile.mobile}`, cvWidth / 2, detailsStartY);
            ctx.fillText(`Email ID: ${profile.email}`, cvWidth / 2, detailsStartY + 50);
            ctx.fillText(`Location: ${profile.city}`, cvWidth / 2, detailsStartY + 100);

            ctx.fillStyle = "#2563eb";
            ctx.font = "bold 22px sans-serif";
            ctx.fillText("www.infinityarthvishva.com", cvWidth / 2, cvHeight - 60);

            const link = document.createElement("a");
            link.download = `${profile.name}_IdentityCard.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
            toast.success("Identity Card Saved!");
        } catch (e) {
            toast.error("Failed to generate identity card.");
        } finally {
            setIsDownloadingDSACard(false);
        }
    };

    const toggleHead = (head: string) => {
        if (!profile) return;
        setProfile({ ...profile, head: profile.head === head ? "" : head, category: "" });
    };

    const toggleCategory = (cat: string) => {
        if (!profile) return;
        const selectedCats = profile.category ? profile.category.split(",") : [];
        const updated = selectedCats.includes(cat) ? selectedCats.filter((c) => c !== cat) : [...selectedCats, cat];
        setProfile({ ...profile, category: updated.join(",") });
    };

    if (loading || !profile) return <div className="flex justify-center items-center h-[60vh]"><div className="w-10 h-10 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" /></div>;

    const selectedHeads = profile.head ? profile.head.split(",") : [];
    const selectedCats = profile.category ? profile.category.split(",") : [];
    const isProfileCompleted = !!kyc && kyc.bank_verified === true && kyc.aadhaar_verified === true;

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen">
            {/* --- HEADER --- */}
            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Profile Settings</h1>
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500">Manage your basic identity, banking, and professional credentials.</p>
                    </div>
                    <div className="flex items-center gap-2 self-start md:self-auto">
                        <span className={`px-2 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap ${isProfileCompleted ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                            {isProfileCompleted ? "Profile Completed" : "Profile Incomplete"}
                        </span>
                        <button onClick={() => setIsEditing(!isEditing)} className={`w-[140px] flex items-center justify-center px-2 py-2 rounded-xl text-xs font-bold shadow-lg tracking-widest transition-all ${isEditing ? "bg-rose-500 text-white" : "bg-[#1CADA3] text-white"}`}>
                            {isEditing ? "Cancel" : "Update Profile"}
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 pb-8">
                        <div className="h-28 bg-[#1CADA3] relative mb-14">
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white overflow-hidden shadow-md flex items-center justify-center">
                                        {uploadingPhoto ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <Loader2 className="w-6 h-6 animate-spin text-[#1CADA3]" />
                                                <span className="text-[8px] font-bold text-slate-400">UPDATING</span>
                                            </div>
                                        ) : getProfileImage() ? (
                                            <img key={imageTimestamp} src={getProfileImage()!} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        )}
                                    </div>
                                    <div 
                                        onClick={() => !uploadingPhoto && fileInputRef.current?.click()}
                                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1CADA3] rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform active:scale-95"
                                    >
                                        <Camera size={14} strokeWidth={2.5} />
                                            </div>
                                    <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 text-center mt-2">
                            <h2 className="text-xl font-extrabold text-[#0f172a]">{profile.name}</h2>
                            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">ID: {profile.adv_id}</p>
                            <div className="mt-8 space-y-4 text-left">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input disabled={!isEditing} value={profile.mobile} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email-ID</label>
                                    <input disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                    <input readOnly value={`${profile.state}, ${profile.city}`} className="w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm bg-slate-50 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl"><Landmark size={20} /></div>
                                <div><h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Bank Details</h3><p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Bank Verification</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${bankVerified ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-amber-600 bg-amber-50 border border-amber-100"}`}>
                                    {bankVerified ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} {bankVerified ? "Verified" : "Not Verified"}
                                </span>
                                {!isBankEditing && (
                                    <button onClick={() => { setBankDraft({ bank_name: profile.bank_name || kyc?.bank_name || "", bank_account: profile.bank_account || kyc?.bank_account_number || "", ifsc: profile.ifsc || kyc?.ifsc_code || "" }); setIsBankEditing(true); }} className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#1CADA3] hover:underline"><Pencil size={12} />Edit</button>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank Name</label><input disabled={!isBankEditing} value={kyc?.bank_name || profile.bank_name || ""} onChange={(e) => setProfile({ ...profile, bank_name: e.target.value.toUpperCase() })} placeholder="ENTER BANK NAME" className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number</label><input disabled={!isBankEditing} value={kyc?.bank_account_number || profile.bank_account || ""} onChange={(e) => setProfile({ ...profile, bank_account: e.target.value.replace(/\D/g, "") })} placeholder="Enter Number" className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            <div className="space-y-1.5 md:col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IFSC Code</label><input disabled={!isBankEditing} value={kyc?.ifsc_code || profile.ifsc || ""} onChange={(e) => setProfile({ ...profile, ifsc: e.target.value.toUpperCase() })} placeholder="Enter IFSC Code" className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold tracking-widest text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-100">
                            {isBankEditing && <button onClick={() => { setProfile({ ...profile, bank_name: bankDraft?.bank_name, bank_account: bankDraft?.bank_account, ifsc: bankDraft?.ifsc }); setIsBankEditing(false); }} className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black px-6 py-2.5 rounded-xl uppercase">Cancel</button>}
                            {isBankEditing && <button onClick={() => { setIsBankEditing(false); setBankVerified(false); toast.success("Bank details saved. Please verify."); }} className="bg-[#1CADA3] hover:bg-[#179b92] text-white text-[10px] font-black px-6 py-2.5 rounded-xl uppercase shadow-sm">Save Details</button>}
                            {!isBankEditing && !bankVerified && profile.bank_account && profile.ifsc && (
                                <button disabled={verifyingBank} onClick={handleBankVerification} className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black px-6 py-2.5 rounded-xl uppercase flex items-center gap-2 shadow-sm disabled:opacity-70">
                                    {verifyingBank ? <><Loader2 size={12} className="animate-spin" />Verifying…</> : <><CheckCircle2 size={12} />Verify Bank</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        
                        {/* LEFT SUB-COLUMN: Visiting Card + KYC */}
                        <div className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Digital Visiting Card</h4>
                            <div className="aspect-[1.75/1] rounded-2xl shadow-1xl overflow-hidden relative border border-slate-200 bg-slate-900 group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${CardTemplateImage.src})` }} />
                                <div className="absolute inset-0 pl-15 pt-16 p-8 flex flex-col justify-between">
                                        <div><h4 className="text-2xl font-black text-slate-700 uppercase leading-none truncate">{profile.name}</h4><p className="text-[8px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Authorized Partner </p></div>
                                    <div className="space-y-1.5">
                                            <div className="flex items-center gap-2"><Phone size={10} className="text-slate-400" strokeWidth={2.5} /><span className="text-[11px] font-bold text-slate-700">+91 {profile.mobile}</span></div>
                                            <div className="flex items-center gap-2"><Mail size={10} className="text-slate-400" strokeWidth={2.5} /><span className="text-[11px] font-bold text-slate-700 truncate">{profile.email}</span></div>
                                            <div className="flex items-center gap-2"><MapPin size={10} className="text-slate-400" strokeWidth={2.5} /><span className="text-[11px] font-bold text-slate-700">{profile.city}</span></div>
                                            <div className="flex items-center gap-2"><Globe size={10} className="text-slate-400" strokeWidth={2.5} /><span className="text-[11px] font-bold text-slate-700">www.infinityarthvishva.com</span></div>
                                        </div>
                                        <button disabled={isDownloadingCard} onClick={downloadCardAsPhoto} className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 w-fit bg-slate-700 text-white px-2 py-1 rounded-lg text-[8px] font-bold shadow-lg flex items-center gap-2 hover:bg-black disabled:opacity-70">
                                            {isDownloadingCard && <Loader2 size={12} className="animate-spin" />} {isDownloadingCard ? "Generating..." : "Download Card"}
                                        </button>
                                    </div>
                                </div>
                                        </div>

                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><CheckCircle2 size={18} strokeWidth={2.5} /></div>
                                    <h3 className="text-md font-bold text-[#0f172a]">KYC & Verification Hub</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: 'PAN Card', value: profile.pan, verified: profile.pan_verified },
                                        { title: 'Aadhar Card', value: `•••• ${profile.aadhaar?.slice(-4) || '1234'}`, verified: aadhaarVerified },
                                        { title: 'GST Registration', value: profile.gst_number || 'NOT LINKED', verified: gstVerified },
                                    ].map((item) => (
                                        <div key={item.title} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between">
                                                <div><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p><p className="text-[11px] font-bold text-slate-700">{item.value}</p></div>
                                                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${item.verified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>
                                                    {item.verified ? "Verified" : "Pending"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SUB-COLUMN: DSA Identity Card */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">DSA Identity Card</h4>
                            <div className="max-w-[300px] aspect-[1/1.58] rounded-2xl bg-white border border-slate-200 shadow-xl relative overflow-hidden group flex flex-col">
                                <div className="h-2 w-full bg-[#1CADA3]"></div>

                                <div className="p-6 flex flex-col items-center h-full">
                                    <div className="h-14 w-38 mb-6">
                                            <img src={LogoImage.src} alt="logo" className="w-full h-full object-contain" />
                                        </div>
                                    
                                    <div className="w-25 h-30 border-2 border-slate-200 rounded-lg overflow-hidden mb-4 bg-slate-50 flex items-center justify-center">
                                        {getProfileImage() ? (
                                            <img key={imageTimestamp} src={getProfileImage()!} className="w-full h-full object-cover" alt="Profile" />
                                        ) : (
                                            <div className="text-slate-300 font-bold text-[8px] uppercase">Photo</div>
                                        )}
                                    </div>

                                    <div className="text-center mb-4">
                                        <h4 className="text-lg font-black text-blue-600 uppercase leading-tight">{profile.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Authorized Partner</p>
                                        <p className="text-[10px] font-bold text-slate-700 mt-1">Partner ID - {profile.adv_id}</p>
                                        </div>

                                    <div className="w-full text-center space-y-1 border-t border-slate-100 pt-4 mb-4">
                                        <p className="text-[12px] font-bold text-slate-700"><span className="text-slate-400">Contact No:</span> +91 {profile.mobile}</p>
                                        <p className="text-[12px] font-bold text-slate-700 truncate px-2"><span className="text-slate-400">Email ID:</span> {profile.email}</p>
                                        <p className="text-[12px] font-bold text-slate-700"><span className="text-slate-400">Location:</span> {profile.city}</p>
                                        </div>

                                    <div className="mt-auto pt-2">
                                        <p className="text-[10px] font-bold text-blue-600">www.infinityarthvishva.com</p>
                                    </div>

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                        <button disabled={isDownloadingDSACard} onClick={downloadDSACardAsPhoto} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                                            {isDownloadingDSACard ? <Loader2 className="animate-spin" size={14} /> : "Download ID Card"}
                                        </button>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-[#1CADA3] mt-auto"></div>
                            </div>
                        </div>
                    </div>

                    {/* PROFESSIONAL EXPERTISE */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></div>
                            <h3 className="text-xl font-bold text-[#0f172a]">Professional Expertise</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Head Categories</label>
                                <div className="flex flex-wrap gap-3">
                                    {Object.keys(CATEGORY_MAP).map((head) => (
                                        <button key={head} disabled={!isEditing} onClick={() => toggleHead(head)} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${profile?.head === head ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-md shadow-[#1cada330]" : "bg-white border-slate-100 text-slate-500"}`}>{head}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                {selectedHeads.length > 0 ? (
                                    <div className="space-y-6">
                                        {selectedHeads.map((head) => (
                                            <div key={head} className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                                                <p className="text-[10px] font-black text-[#1CADA3] uppercase mb-4 px-1">{head} Sub Categories</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(CATEGORY_MAP[head] || []).map((cat) => (
                                                        <button key={cat} disabled={!isEditing} onClick={() => toggleCategory(cat)} className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${selectedCats.includes(cat) ? "bg-[#1CADA3] text-white shadow-md" : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"}`}>{cat}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center"><p className="text-xs text-slate-400 font-medium">Please select a Head Category above.</p></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <button disabled={saving} onClick={async () => { try { setSaving(true); await DashboardService.editProfile(profile); toast.success("Profile information updated!"); setIsEditing(false); } catch (err) { toast.error("Failed to update changes."); } finally { setSaving(false); } }} className="px-12 py-4 bg-[#1CADA3] text-white rounded-2xl shadow-xl shadow-[#1cada340] font-bold transition-all active:scale-95">
                                {saving ? "Saving Changes..." : "Save All Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}