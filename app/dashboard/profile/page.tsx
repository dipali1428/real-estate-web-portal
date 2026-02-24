"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import CardTemplateImage from "@/app/assets/Bussiness_Card2.png";
import { Phone, Mail, MapPin, Globe, Landmark, Pencil, CheckCircle2, AlertCircle, Loader2, Camera, Eye, EyeOff, X } from "lucide-react";
import LogoImage from "@/public/logo.png";

// --- Types & Constants ---
interface PopupMessage {
    id: string;
    message: string;
    type: "success" | "error" | "loading";
}

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
    name_as_per_pan?: string;
    date_of_birth?: string;
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

const maskAccount = (num: string) => {
    if (!num) return "";
    return "•".repeat(Math.max(0, num.length - 4)) + num.slice(-4);
};

const maskIFSC = (ifsc: string) => {
    if (!ifsc) return "";
    return ifsc.slice(0, 4) + "••••" + ifsc.slice(-3);
};

export default function ProfileSection() {
    // --- Custom Popup State ---
    const [popups, setPopups] = useState<PopupMessage[]>([]);

    const removePopup = useCallback((id: string) => {
        setPopups(prev => prev.filter(p => p.id !== id));
    }, []);

    const triggerPopup = useCallback((message: string, type: "success" | "error" | "loading" = "success", manualId?: string) => {
        const id = manualId || Math.random().toString(36).substring(2, 9);

        setPopups(prev => {
            const exists = prev.find(p => p.id === id);
            if (exists) {
                return prev.map(p => p.id === id ? { ...p, message, type } : p);
            }
            return [...prev, { id, message, type }];
        });

        if (type !== "loading") {
            setTimeout(() => removePopup(id), 4000);
        }
        return id;
    }, [removePopup]);

    // --- Original Logic States ---
    const [verifyingPan, setVerifyingPan] = useState(false);
    const [verifyingAadhaar, setVerifyingAadhaar] = useState(false);
    const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
    const [aadhaarReferenceId, setAadhaarReferenceId] = useState("");
    const [aadhaarOtpInput, setAadhaarOtpInput] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isKycEditing, setIsKycEditing] = useState(false);
    const [kycDraft, setKycDraft] = useState<any>(null);
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

    const [verifyingGst, setVerifyingGst] = useState(false);

    const refreshProfileData = async () => {
        try {
            const res = await DashboardService.getProfile();
            setProfile({
                ...res.user,
                aadhaar: res.kycDetails?.aadhaar_number || res.user.aadhaar || "",
                gst_number: res.kycDetails?.gst_number || res.user.gst_number || ""
            });
            setKyc(res.kycDetails);

            setBankVerified(!!res.kycDetails?.bank_verified);
            setAadhaarVerified(!!res.kycDetails?.aadhaar_verified);
            setGstVerified(!!res.kycDetails?.gst_verified);

            originalPassword.current = res.user.password;
        } catch (error) {
            console.error("Failed to refresh profile:", error);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const initFetch = async () => {
            setLoading(true);
            await refreshProfileData();
            setLoading(false);
        };
        initFetch();
    }, []);

    const handleBankVerification = async () => {
        if (!profile?.bank_account || !profile?.ifsc) {
            return triggerPopup("Please enter Account Number & IFSC", "error");
        }
        let popupId: string;
        try {
            setVerifyingBank(true);
            popupId = triggerPopup("Verifying bank details...", "loading");
            const res = await DashboardService.verifyBankDetails({
                bank_account_number: profile.bank_account,
                ifsc_code: profile.ifsc,
                bank_name: profile.bank_name,
            });
            if (res.status === "success") {
                setBankVerified(true);
                await refreshProfileData();
                triggerPopup("Bank verified successfully!", "success", popupId);
            } else {
                triggerPopup(res.message || "Bank verification failed", "error", popupId);
            }
        } catch (err: any) {
            triggerPopup(err?.response?.data?.message || "Unable to verify", "error");
        } finally {
            setVerifyingBank(false);
        }
    };

    const handleRequestAadhaarOtp = async () => {
        if (!profile?.aadhaar || profile.aadhaar.length !== 12) {
            return triggerPopup("Please enter a valid 12-digit Aadhaar number", "error");
        }

        let popupId: string;
        try {
            setVerifyingAadhaar(true);
            popupId = triggerPopup("Sending OTP to your Aadhaar-linked mobile...", "loading");

            const res = await DashboardService.generateAadhaarOtp(profile.aadhaar);

            if (res.status === "success" || res.reference_id) {
                const refId = res.reference_id || res.data?.reference_id;
                setAadhaarReferenceId(refId);
                setAadhaarOtpSent(true);
                triggerPopup("OTP sent successfully!", "success", popupId);
            } else {
                triggerPopup(res.message || "Failed to send OTP", "error", popupId);
            }
        } catch (err: any) {
            triggerPopup(err?.response?.data?.message || "Error sending OTP", "error");
        } finally {
            setVerifyingAadhaar(false);
        }
    };

    const handlePanVerification = async () => {
        if (!profile?.pan || !profile?.name_as_per_pan || !profile?.date_of_birth) {
            return triggerPopup("Please enter PAN, Name as per PAN, and Date of Birth", "error");
        }

        const [year, month, day] = profile.date_of_birth.split("-");
        const formattedDateForApi = `${day}/${month}/${year}`;

        let popupId: string;
        try {
            setVerifyingPan(true);
            popupId = triggerPopup("Verifying PAN...", "loading");

            const res = await DashboardService.verifyPan({
                pan: profile.pan,
                name_as_per_pan: profile.name_as_per_pan,
                date_of_birth: formattedDateForApi,
            });

            if (res.status === "success" || res.code === 200) {
                const verifiedData = res.data;
                // Immediate local state update for PAN
                setProfile(prev => prev ? { 
                    ...prev, 
                    pan_verified: true,
                    name: verifiedData.name || prev.name,
                    pan: verifiedData.pan || prev.pan
                } : prev);
                
                await refreshProfileData();
                triggerPopup("PAN verified successfully!", "success", popupId);
            } else {
                triggerPopup(res.message || "PAN verification failed", "error", popupId);
            }
        } catch (err: any) {
            triggerPopup(err?.response?.data?.message || "Verification failed", "error");
        } finally {
            setVerifyingPan(false);
        }
    };

    const handleVerifyAadhaarOtp = async () => {
        if (!aadhaarOtpInput || aadhaarOtpInput.length < 6) {
            return triggerPopup("Please enter a valid OTP", "error");
        }

        if (!profile?.aadhaar) {
            return triggerPopup("Aadhaar number is missing", "error");
        }

        let popupId: string;
        try {
            setVerifyingAadhaar(true);
            popupId = triggerPopup("Verifying OTP...", "loading");

            const res = await DashboardService.verifyAadhaarOtp({
                reference_id: aadhaarReferenceId,
                otp: aadhaarOtpInput,
                aadhaar_number: profile.aadhaar
            });

            if (res.status === "success" || (res.code === 200 && res.data?.status === "VALID")) {
                const verifiedData = res.data;

                // 1. Update Local UI States Immediately
                setAadhaarVerified(true);
                setAadhaarOtpSent(false);
                setAadhaarOtpInput("");
                
                if (profile) {
                    setProfile({
                        ...profile,
                        name: verifiedData.name || profile.name,
                        aadhaar: verifiedData.aadhaar_number || profile.aadhaar
                    });
                }

                // 2. Fetch fresh profile data to sync everything else
                await refreshProfileData();
                triggerPopup("Aadhaar verified successfully!", "success", popupId);
            } else {
                const errorMsg = res.data?.message || res.message || "Invalid OTP or Verification Failed";
                triggerPopup(errorMsg, "error", popupId);
            }
        } catch (err: any) {
            triggerPopup(err?.response?.data?.message || "Verification failed", "error");
        } finally {
            setVerifyingAadhaar(false);
        }
    };

    const handleGstVerification = async () => {
        if (!profile?.gst_number || profile.gst_number.length !== 15) {
            return triggerPopup("Please enter a valid 15-digit GST number", "error");
        }
    
        let popupId: string;
        try {
            setVerifyingGst(true);
            popupId = triggerPopup("Verifying GST details...", "loading");
    
            const res = await DashboardService.verifyGst(profile.gst_number);
    
            // UPDATED CONDITION: Match your specific server response
            if (res.message === "GST verified successfully" || res.data?.gst_verified === true) {
                
                // 1. Update individual boolean state immediately
                setGstVerified(true);
                
                // 2. Update KYC state locally so the "Profile Completed" logic updates instantly
                setKyc(prev => {
                    if (!prev) return prev;
                    return { 
                        ...prev, 
                        gst_verified: true,
                        gst_number: profile.gst_number,
                        // If everything else is already verified, mark KYC as complete locally
                        kyc_completed: (prev.bank_verified && prev.aadhaar_verified) ? true : prev.kyc_completed
                    };
                });
    
                // 3. Update the profile state to keep data in sync
                setProfile(prev => prev ? { ...prev, gst_number: profile.gst_number } : prev);
    
                // 4. Trigger the background refresh to sync with the database
                await refreshProfileData();
                
                triggerPopup("GST verified successfully!", "success", popupId);
            } else {
                // This handles cases where the API returns a 200 but the verification failed
                triggerPopup(res.message || "GST verification failed", "error", popupId);
            }
        } catch (err: any) {
            console.error("GST verification error:", err);
            triggerPopup(err?.response?.data?.message || "Verification failed", "error");
        } finally {
            setVerifyingGst(false);
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localBlob = URL.createObjectURL(file);
        setPhotoPreview(localBlob);

        const formData = new FormData();
        formData.append("profile_photo", file);

        let popupId: string;
        try {
            setUploadingPhoto(true);
            popupId = triggerPopup("Updating profile picture...", "loading");

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
                triggerPopup("Profile picture updated!", "success", popupId);
            } else {
                setPhotoPreview(null);
                triggerPopup("Failed to update image", "error", popupId);
            }
        } catch (err: any) {
            setPhotoPreview(null);
            triggerPopup("Error uploading image", "error");
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
            triggerPopup("Card downloaded successfully!", "success");
        } catch (err) { triggerPopup("Failed to generate card.", "error"); } finally { setIsDownloadingCard(false); }
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
            ctx.fillStyle = "#1CADA3";
            ctx.fillRect(0, 0, cvWidth, 15);
            ctx.fillRect(0, cvHeight - 15, cvWidth, 15);

            const logo = new Image();
            logo.src = LogoImage.src; logo.crossOrigin = "anonymous";
            await new Promise((res) => { logo.onload = res; logo.onerror = res; });
            if (logo.complete) {
                const logoW = 200; const logoH = 60;
                ctx.drawImage(logo, (cvWidth - logoW) / 2, 60, logoW, logoH);
            }

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
            triggerPopup("Identity Card Saved!", "success");
        } catch (e) {
            triggerPopup("Failed to generate identity card.", "error");
        } finally {
            setIsDownloadingDSACard(false);
        }
    };

    const toggleHead = (head: string) => {
        if (!profile) return;
        const currentHeads = profile.head ? profile.head.split(",").map(h => h.trim()).filter(Boolean) : [];
        let updatedHeads = currentHeads.includes(head) ? currentHeads.filter(h => h !== head) : [...currentHeads, head];
        setProfile({ ...profile, head: updatedHeads.join(",") });
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
    const isProfileCompleted = kyc?.kyc_completed === true;

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen relative">

            {/* --- CUSTOM NOTIFICATION POPUPS --- */}
            <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
                {popups.map((p) => (
                    <div
                        key={p.id}
                        className={`pointer-events-auto min-w-[280px] px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300
            ${p.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                                p.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                                    'bg-white border-slate-200 text-slate-800'}`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-bold tracking-wide">
                                {p.type === 'loading' ? `Please wait: ${p.message}` : p.message}
                            </span>
                            <button
                                onClick={() => removePopup(p.id)}
                                className="text-xs font-black uppercase opacity-50 hover:opacity-100 transition-opacity"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            disabled={!isEditing}
                                            value={profile.password || ""}
                                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                            placeholder="Update Password"
                                            className={`w-full px-4 py-2.5 rounded-xl font-bold text-slate-700 text-sm outline-none pr-10 ${isEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1CADA3]"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8">
                        <div className="mb-8">
                                        <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">
                                            Step - 2
                                        </span>
                                    </div>
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
                            <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number</label><input disabled={!isBankEditing} value={isBankEditing 
    ? (profile.bank_account || kyc?.bank_account_number || "") 
    : maskAccount(profile.bank_account || kyc?.bank_account_number || "")
} onChange={(e) => setProfile({ ...profile, bank_account: e.target.value.replace(/\D/g, "") })} placeholder="Enter Number" className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            <div className="space-y-1.5 md:col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IFSC Code</label><input disabled={!isBankEditing} value={isBankEditing 
    ? (profile.ifsc || kyc?.ifsc_code || "") 
    : maskIFSC(profile.ifsc || kyc?.ifsc_code || "")
} onChange={(e) => setProfile({ ...profile, ifsc: e.target.value.toUpperCase() })} placeholder="Enter IFSC Code" className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold tracking-widest text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-100">
                            {isBankEditing && <button onClick={() => { setProfile({ ...profile, bank_name: bankDraft?.bank_name, bank_account: bankDraft?.bank_account, ifsc: bankDraft?.ifsc }); setIsBankEditing(false); }} className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black px-6 py-2.5 rounded-xl uppercase">Cancel</button>}
                            {isBankEditing && <button onClick={() => { setIsBankEditing(false); setBankVerified(false); triggerPopup("Bank details saved. Please verify.", "success"); }} className="bg-[#1CADA3] hover:bg-[#179b92] text-white text-[10px] font-black px-6 py-2.5 rounded-xl uppercase shadow-sm">Save Details</button>}
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
                                 <div className="mb-8">
                                        <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">
                                            Step - 1
                                        </span>
                                    </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                      {/* <p className="text-xl font-light text-slate-800 tracking-tight">Step 1</p> */}
                                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
                                            <CheckCircle2 size={18} strokeWidth={2.5} />
                                        </div>
                                        
                                        <h3 className="text-md font-bold text-[#0f172a]">KYC & Verification Hub</h3>
                                    </div>

                                    {!isKycEditing ? (
                                        <button
                                            onClick={() => {
                                                setKycDraft({
                                                    pan: profile.pan,
                                                    aadhaar: profile.aadhaar,
                                                    gst: profile.gst_number
                                                });
                                                setIsKycEditing(true);
                                            }}
                                            className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#1CADA3] hover:underline"
                                        >
                                            <Pencil size={12} />Edit KYC
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsKycEditing(false)}
                                                className="text-[10px] font-black uppercase text-rose-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsKycEditing(false);
                                                    triggerPopup("KYC details updated locally. Save all changes to submit.", "success");
                                                }}
                                                className="text-[10px] font-black uppercase text-emerald-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">PAN Card</p>
                                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${profile.pan_verified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>
                                                {profile.pan_verified ? "Verified" : "Pending"}
                                            </span>
                                        </div>

                                        {isKycEditing ? (
                                            <div className="space-y-3">
                                                <input
                                                    className="w-full text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-[#1CADA3]"
                                                    value={profile.pan}
                                                    placeholder="Enter PAN (e.g. ABCDE1234F)"
                                                    maxLength={10}
                                                    onChange={(e) => setProfile({ ...profile, pan: e.target.value.toUpperCase() })}
                                                    disabled={profile.pan_verified}
                                                />

                                                {!profile.pan_verified && (
                                                    <>
                                                        <input
                                                            className="w-full text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-[#1CADA3]"
                                                            value={profile.name_as_per_pan || ""}
                                                            placeholder="Full Name as per PAN Card"
                                                            onChange={(e) => setProfile({ ...profile, name_as_per_pan: e.target.value.toUpperCase() })}
                                                        />

                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="date"
                                                                className="flex-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-[#1CADA3]"
                                                                value={profile.date_of_birth || ""}
                                                                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                                                            />
                                                            <button
                                                                onClick={handlePanVerification}
                                                                disabled={verifyingPan || !profile.pan}
                                                                className="bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                                                            >
                                                                {verifyingPan ? "..." : "Verify"}
                                                            </button>
                                                        </div>
                                                    <p className="text-[9px]  text-red-400 leading-tight">
                                                        * Note: Upon successful verification, your profile name will be automatically updated to match the name on your PAN card.
                                                    </p>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-[11px] font-bold text-slate-700">{profile.pan}</p>
                                        )}
                                    </div>

                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Aadhar Card</p>
                                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${aadhaarVerified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>
                                                {aadhaarVerified ? "Verified" : "Pending"}
                                            </span>
                                        </div>

                                        {isKycEditing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <input
                                                        className="w-full text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-[#1CADA3] transition-all focus:border-[#1CADA3]"
                                                        value={profile.aadhaar || ""}
                                                        placeholder="Enter 12 digit Aadhaar"
                                                        maxLength={12}
                                                        onChange={(e) => {
                                                            const newVal = e.target.value.replace(/\D/g, "");
                                                            setProfile({ ...profile, aadhaar: newVal });
                                                            if (newVal !== kyc?.aadhaar_number) {
                                                                setAadhaarVerified(false);
                                                            }
                                                        }}
                                                        disabled={aadhaarOtpSent}
                                                    />
                                                </div>

                                                {!aadhaarOtpSent && (
                                                    <button
                                                        onClick={handleRequestAadhaarOtp}
                                                        disabled={verifyingAadhaar || profile.aadhaar?.length !== 12}
                                                        className="whitespace-nowrap bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:bg-slate-300 shadow-sm"
                                                    >
                                                        {verifyingAadhaar ? "Sending..." : (aadhaarVerified ? "Re-verify" : "Get OTP")}
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-[11px] font-bold text-slate-700">
                                                {profile.aadhaar ? profile.aadhaar : "NOT PROVIDED"}
                                            </p>
                                        )}

                                        {aadhaarOtpSent && (
                                            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2 text-gray-700 animate-in fade-in slide-in-from-top-1">
                                                <input
                                                    type="text"
                                                    placeholder="Enter 6-digit OTP"
                                                    maxLength={6}
                                                    value={aadhaarOtpInput}
                                                    onChange={(e) => setAadhaarOtpInput(e.target.value.replace(/\D/g, ""))}
                                                    className="flex-1 text-[11px] font-bold px-3 py-2 rounded-lg border border-[#1CADA3] outline-none bg-emerald-50/30"
                                                />
                                                <button
                                                    onClick={handleVerifyAadhaarOtp}
                                                    disabled={verifyingAadhaar || aadhaarOtpInput.length < 6}
                                                    className="bg-emerald-600 text-white text-[10px] px-4 py-2 rounded-lg font-bold disabled:opacity-50 shadow-sm"
                                                >
                                                    {verifyingAadhaar ? "..." : "Verify"}
                                                </button>
                                                <button
                                                    onClick={() => setAadhaarOtpSent(false)}
                                                    className="text-rose-500 text-[9px] font-bold hover:underline px-2"
                                                >
                                                    Edit No.
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between">
    <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                GST Registration
            </p>
            <span className="text-[7px] leading-none bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold uppercase">
                Optional
            </span>
        </div>

        {isKycEditing ? (
            <div className="flex items-center gap-2">
                <input
                    className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 w-full outline-[#1CADA3]"
                    value={profile.gst_number || ""}
                    placeholder="Enter GST Number"
                    maxLength={15}
                    onChange={(e) => setProfile({ ...profile, gst_number: e.target.value.toUpperCase() })}
                    disabled={gstVerified}
                />
                {!gstVerified && profile.gst_number && (
                    <button
                        onClick={handleGstVerification}
                        disabled={verifyingGst || profile.gst_number.length < 15}
                        className="bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {verifyingGst ? "..." : "Verify"}
                    </button>
                )}
            </div>
        ) : (
            <p className="text-[11px] font-bold text-slate-700">
                {profile.gst_number || 'NOT LINKED'}
            </p>
        )}
    </div>

    <span className={`ml-4 text-[8px] font-black uppercase px-2 py-1 rounded-lg ${gstVerified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>
        {gstVerified ? "Verified" : "Pending"}
    </span>
</div>
                                </div>
                            </div>
                        </div>

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

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></div>
                            <h3 className="text-xl font-bold text-[#0f172a]">Professional Expertise</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Head Categories</label>
                                <div className="flex flex-wrap gap-3">
                                    {Object.keys(CATEGORY_MAP).map((head) => {
                                        const isActive = selectedHeads.includes(head);
                                        return (
                                            <button
                                                key={head}
                                                disabled={!isEditing}
                                                onClick={() => toggleHead(head)}
                                                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${isActive
                                                    ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-md shadow-[#1cada330]"
                                                    : "bg-white border-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {head}
                                            </button>
                                        );
                                    })}
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
                            <button disabled={saving} onClick={async () => { try { setSaving(true); await DashboardService.editProfile(profile); triggerPopup("Profile information updated!", "success"); setIsEditing(false); } catch (err) { triggerPopup("Failed to update changes.", "error"); } finally { setSaving(false); } }} className="px-12 py-4 bg-[#1CADA3] text-white rounded-2xl shadow-xl shadow-[#1cada340] font-bold transition-all active:scale-95">
                                {saving ? "Saving Changes..." : "Save All Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}