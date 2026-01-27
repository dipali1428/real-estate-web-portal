"use client";

import { useEffect, useRef, useState } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import toast from "react-hot-toast";
import CardTemplateImage from "@/app/assets/Bussiness_Card.png";
// Ensure this path points to your actual logo file
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
    pan_verified: false,
    profile_photo?: any; // Added to support photo
}

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: ["Mutual Funds", "Wealth Management", "Pension Funds", "Stocks and Securities", "Portfolio Management Services", "Real Estate Investments", "Unlisted Shares"],
    Protection: ["Life Insurance", "Health Insurance", "Motor Insurance", "Travel Insurance","Cattle Insurance","Marine Insurance", "Corporate Insurance"],
    Finance: ["Home Finance", "Personal Finance", "SME Finance", "EMI Solution", "Loan Against Securities", "Corporate Finance", "Mortgage Finance", "Debt Capital Market & Loan Syndication", "Asset Reconstruction", "Tax Consultancy", "Education Loan", "Business Loan"],
};

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const originalPassword = useRef<string>(""); 
    const hasFetched = useRef(false);

    // --- PHOTO UPLOAD STATES & REFS ---
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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

    // Loader States for Downloads
    const [isDownloadingCard, setIsDownloadingCard] = useState(false);
    const [isDownloadingDSACard, setIsDownloadingDSACard] = useState(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await DashboardService.getProfile();
                console.log("Fetched Profile:", res);
                
                setProfile(res.user);
                originalPassword.current = res.user.password;
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // --- Logic Handlers ---
    
    // NEW PHOTO HANDLER
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && profile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            // Update profile state so it's included when "Save All Changes" is clicked
            setProfile({ ...profile, profile_photo: file }); 
        }
    };

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
        const isAlreadySelected = profile.head === head;
        const updatedHead = isAlreadySelected ? "" : head;
        setProfile({ ...profile, head: updatedHead, category: "" });
    };

    const toggleCategory = (cat: string) => {
        if (!profile) return;
        const selectedCats = profile.category ? profile.category.split(",") : [];
        const updated = selectedCats.includes(cat) ? selectedCats.filter((c) => c !== cat) : [...selectedCats, cat];
        setProfile({ ...profile, category: updated.join(",") });
    };

    const downloadCardAsPhoto = async () => {
        if (!profile) return;
        setIsDownloadingCard(true);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return setIsDownloadingCard(false);
        const cvWidth = 1200; const cvHeight = 675;
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
            const link = document.createElement("a"); link.download = `${profile.name}_BusinessCard.jpg`;
            link.href = canvas.toDataURL("image/jpeg", 1.0); link.click();
            toast.success("Card downloaded successfully!");
        } catch (e) { 
            toast.error("Template failed to load."); 
        } finally {
            setIsDownloadingCard(false);
        }
    };

    const downloadDSACardAsPhoto = async () => {
        if (!profile) return;
        setIsDownloadingDSACard(true);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return setIsDownloadingDSACard(false);

        const cvWidth = 1000;
        const cvHeight = 570;
        canvas.width = cvWidth;
        canvas.height = cvHeight;

        try {
            // Background & Quality settings
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.roundRect(0, 0, cvWidth, cvHeight, 40);
            ctx.fill();

            // Decorative Elements
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = "#1CADA3";
            ctx.beginPath(); ctx.arc(cvWidth, 0, 220, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "#3b82f6";
            ctx.beginPath(); ctx.arc(0, cvHeight, 220, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 1.0;

            // Proper Logo Placement (Top Right with padding)
            const logo = new Image();
            logo.src = LogoImage.src; logo.crossOrigin = "anonymous";
            await new Promise((res) => { logo.onload = res; logo.onerror = res; });
            if (logo.complete && logo.naturalWidth > 0) {
                const logoSize = 90;
                const padding = 50;
                ctx.drawImage(logo, cvWidth - logoSize - padding, padding, logoSize, logoSize);
            }

            // Header Content
            ctx.fillStyle = "#1CADA3";
            ctx.font = "bold 22px sans-serif";
            ctx.fillText("INFINITY ARTHVISHVA", 60, 80);

            ctx.fillStyle = "#1e293b";
            ctx.font = "900 52px sans-serif";
            ctx.fillText(profile.name.toUpperCase(), 60, 150);

            ctx.fillStyle = "#64748b";
            ctx.font = "bold 18px sans-serif";
            ctx.fillText("CERTIFIED ADVISOR", 60, 190);

            // Information Grid
            const gridY = 280;
            const col1 = 60;
            const col2 = 520;
            const rowGap = 90;

            const drawInfo = (label: string, value: string, x: number, y: number) => {
                ctx.fillStyle = "#94a3b8";
                ctx.font = "bold 14px sans-serif";
                ctx.fillText(label.toUpperCase(), x, y);
                ctx.fillStyle = "#334155";
                ctx.font = "bold 24px sans-serif";
                ctx.fillText(value, x, y + 35);
            };

            drawInfo("Advisor ID", profile.adv_id, col1, gridY);
            drawInfo("Contact Number", `+91 ${profile.mobile}`, col2, gridY);
            drawInfo("Email Address", profile.email, col1, gridY + rowGap);
            drawInfo("Location", profile.city, col2, gridY + rowGap);

            // Footer Section
            ctx.fillStyle = "#1CADA3";
            ctx.beginPath(); ctx.roundRect(60, 510, 80, 10, 5); ctx.fill();
            
            ctx.textAlign = "right";
            ctx.fillStyle = "#94a3b8";
            ctx.font = "italic 15px serif";
            ctx.fillText("Authorized Partner", cvWidth - 60, 520);

            const link = document.createElement("a");
            link.download = `${profile.name}_DSA_IdentityCard.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
            toast.success("Identity Card saved!");
        } catch (e) {
            toast.error("Failed to generate high-quality image.");
        } finally {
            setIsDownloadingDSACard(false);
        }
    };

    if (loading || !profile) return <div className="flex justify-center items-center h-[60vh]"><div className="w-10 h-10 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" /></div>;

    const selectedHeads = profile.head ? profile.head.split(",") : [];
    const selectedCats = profile.category ? profile.category.split(",") : [];

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen">
            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Profile Settings</h1>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Manage your basic identity, banking, and professional credentials.</p>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isEditing ? "bg-rose-500 text-white" : "bg-[#1CADA3] text-white"}`}>
                    {isEditing ? "✕ Cancel " : "✎ Update Profile"}
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-4 space-y-6">
                     <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                        <div className="h-28 bg-[#1CADA3] relative mb-14">
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white overflow-hidden shadow-md flex items-center justify-center">
                                        {photoPreview || profile.profile_photo ? (
                                            <img src={photoPreview || profile.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <>
                                            {/* Edit Icon Badge */}
                                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1CADA3] rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            </div>
                                            {/* Large Hover Overlay */}
                                            <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                            </button>
                                        </>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-8 text-center mt-2">
                            <h2 className="text-xl font-extrabold text-[#0f172a]">{profile.name}</h2>
                            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">ID: {profile.adv_id}</p>
                            <div className="mt-8 space-y-4 text-left">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input disabled={!isEditing} value={profile.mobile} onChange={(e) => setProfile({...profile, mobile: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email-ID</label>
                                    <input disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                    <input readOnly value={`${profile.city}, ${profile.state}`} className="w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm bg-slate-50 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#0f172a]">Bank Details (Coming Soon)</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Name</label>
                                <input disabled={!isEditing} value={profile.bank_name || ""} onChange={(e) => setProfile({...profile, bank_name: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none transition-all uppercase ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} placeholder="Enter Bank Name" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Account Number</label>
                                <input disabled={!isEditing} value={profile.bank_account || ""} onChange={(e) => setProfile({...profile, bank_account: e.target.value.replace(/\D/g, "")})} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none transition-all ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} placeholder="Enter Account Number" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">IFSC Code</label>
                                <input disabled={!isEditing} value={profile.ifsc || ""} onChange={(e) => setProfile({...profile, ifsc: e.target.value.toUpperCase()})} className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none transition-all tracking-widest ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50 border border-transparent"}`} placeholder="IFSC Code" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-8 space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Digital Visiting Card */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Visiting Card</h4>
                            <div className="aspect-[1.75/1] rounded-2xl shadow-xl overflow-hidden relative border border-slate-200 bg-slate-900 group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${CardTemplateImage.src})` }} />
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div><h4 className="text-xl font-black text-slate-800 uppercase leading-none truncate">{profile.name}</h4><p className="text-[8px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Authorized Partner </p></div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg><span className="text-[9px] font-bold text-slate-700">+91 {profile.mobile}</span></div>
                                        <div className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><span className="text-[9px] font-medium text-slate-800 truncate">{profile.email}</span></div>
                                        <div className="flex items-center gap-2"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span className="text-[9px] font-bold text-slate-700">{profile.city}</span></div>
                                    </div>
                                    <button 
                                        disabled={isDownloadingCard}
                                        onClick={downloadCardAsPhoto} 
                                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-fit bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold shadow-lg flex items-center gap-2 hover:bg-black disabled:opacity-70"
                                    >
                                        {isDownloadingCard && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                        {isDownloadingCard ? "Generating..." : "Download Card"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DSA Identity Card */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DSA Identity Card</h4>
                            <div className="aspect-[1.75/1] rounded-2xl bg-white border border-blue-100 shadow-2xl p-6 relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#1CADA3] opacity-10 rounded-full blur-3xl"></div>
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

                                <div className="relative h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#1CADA3] tracking-[0.2em] uppercase">Infinity Arthvishva</p>
                                            <h4 className="text-xl font-black text-gray-700 uppercase tracking-tight mt-1">{profile.name}</h4>
                                        </div>
                                        {/* Minimal Logo in UI */}
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center justify-center p-1">
                                            <img src={LogoImage.src} alt="logo" className="w-full h-full object-contain" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-100 pt-4">
                                        <div>
                                            <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Advisor ID</p>
                                            <p className="text-[8px] font-bold text-gray-500">{profile.adv_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Contact Number</p>
                                            <p className="text-[8px] font-bold text-gray-500">+91 {profile.mobile}</p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Email Address</p>
                                            <p className="text-[8px] font-bold text-gray-500 truncate">{profile.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Location</p>
                                            <p className="text-[8px] font-bold text-gray-500">{profile.city}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end pt-2">
                                        <button 
                                            disabled={isDownloadingDSACard}
                                            onClick={downloadDSACardAsPhoto} 
                                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-[#1CADA3] text-white px-3 py-1.5 rounded-lg text-[9px] font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 uppercase tracking-tighter disabled:opacity-70"
                                        >
                                            {isDownloadingDSACard && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                            {isDownloadingDSACard ? "Generating..." : "Download Card"}
                                        </button>
                                        <p className="text-[6px] text-slate-600 uppercase font-medium serif">Authorized Partner</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   {/* PROFESSIONAL EXPERTISE */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#0f172a]">Professional Expertise</h3>
                        </div>                        
                        
                        <div className="space-y-6">
                            {/* Head Categories */}
                            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Head Categories</label>
                                <div className="flex flex-wrap gap-3">
                                    {Object.keys(CATEGORY_MAP).map((head) => (
                                        <button 
                                            key={head} 
                                            disabled={!isEditing} 
                                            onClick={() => toggleHead(head)} 
                                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${profile?.head === head ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-md shadow-[#1cada330]" : "bg-white border-slate-100 text-slate-500"}`}
                                        >
                                            {head}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Unified Sub Categories Section */}
                            <div className="space-y-4">
                            {selectedHeads.length > 0 ? (
                                <div className="space-y-6">
                                {selectedHeads.map((head) => (
                                    <div
                                    key={head}
                                    className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm animate-in fade-in slide-in-from-top-2"
                                    >
                                    <p className="text-[10px] font-black text-[#1CADA3] uppercase mb-4 px-1">
                                        {head} Sub Categories
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(CATEGORY_MAP[head] || []).map((cat) => (
                                        <button
                                            key={cat}
                                            disabled={!isEditing}
                                            onClick={() => toggleCategory(cat)}
                                            className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
                                            selectedCats.includes(cat)
                                                ? "bg-[#1CADA3] text-white shadow-md"
                                                : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                        ))}
                                    </div>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                                <p className="text-xs text-slate-400 font-medium">
                                    Please select a Head Category above to see specific sub-categories.
                                </p>
                                </div>
                            )}
                            </div>

                        </div>
                    </div>
                    {/* KYC & VERIFICATION HUB */}
                   <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0f172a]">KYC & Verification (Coming Soon)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: 'PAN Card', value: profile.pan, verified: profile.pan_verified, type: 'pan', file: panFile, uploading: uploadingPan, placeholder: 'Enter 10-digit PAN Number' },
                                    { title: 'Aadhar Card', value: `•••• •••• ${profile.aadhaar?.slice(-4) || '1234'}`, verified: aadhaarVerified, type: 'aadhaar', file: aadhaarFile, uploading: uploadingAadhaar, placeholder: 'Enter 12-digit Aadhaar Number' },
                                    { title: 'GST Registration', value: profile.gst_number || 'NOT LINKED', verified: gstVerified, type: 'gst', file: gstFile, uploading: uploadingGst, placeholder: 'Enter 15-digit GSTIN' },
                                ].map((item) => (
                                    <div key={item.title} className="p-5 bg-slate-50/50 border border-slate-100 text-gray-600 rounded-2xl flex flex-col gap-4 group hover:border-slate-200 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#1CADA3] transition-colors">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>
                                                </div>
                                                <div>
                                                    <h5 className="text-xs font-bold text-[#0f172a]">{item.title}</h5>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.value}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${item.verified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>
                                                    {item.verified ? "Verified" : "Pending"}
                                                    
                                                </span>
                                            </div>
                                        </div>

                                        {isEditing && !item.verified && (
                                        <div className="pt-3 border-t border-dashed border-slate-200 flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder={item.placeholder}
                                                    value={item.type === 'pan' ? profile.pan : (item.type === 'gst' ? (profile.gst_number || "") : "")}
                                                    className="flex-1 px-3 py-2 bg-white border border-slate-100 text-gray-600 rounded-xl text-[11px] font-semibold focus:outline-none focus:border-[#1CADA3] transition-colors"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (item.type === 'pan') {
                                                            setProfile({ ...profile, pan: val.toUpperCase() });
                                                        } else if (item.type === 'gst') {
                                                            setProfile({ ...profile, gst_number: val.toUpperCase() });
                                                        }
                                                    }}
                                                />
                                                {item.type === 'pan' && (
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            if (profile.pan.length !== 10) {
                                                                return toast.error("Please enter a valid 10-digit PAN");
                                                            }
                                                            setProfile({ ...profile, pan_verified: true as any });
                                                            toast.success("PAN verified locally. Click 'Save All Changes' to finish.");
                                                        }}
                                                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg uppercase transition-all shadow-sm h-fit self-center whitespace-nowrap"
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <button disabled={saving} onClick={async () => { try { setSaving(true); const passwordChanged = profile.password !== originalPassword.current; await DashboardService.editProfile(profile); if (passwordChanged) { toast.success("Security credentials updated successfully!"); originalPassword.current = profile.password; } else { toast.success("Profile information updated!"); } setIsEditing(false); } catch (err) { toast.error("Failed to update changes."); } finally { setSaving(false); } }} className="px-12 py-4 bg-[#1CADA3] text-white rounded-2xl shadow-xl shadow-[#1cada340] font-bold transition-all active:scale-95">
                                {saving ? "Saving Changes..." : "Save All Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}