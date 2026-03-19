"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import CardTemplateImage from "@/app/assets/Bussiness_Card2.png";
import { Phone, Mail, MapPin, Globe, Landmark, Pencil, CheckCircle2, AlertCircle, Loader2, Camera, Eye, EyeOff, X, ChevronRight, ChevronLeft, ShieldCheck, Briefcase, UserCheck, Download } from "lucide-react";
import LogoImage from "@/public/logo.png";

// --- Types & Constants ---
interface PopupMessage { id: string; message: string; type: "success" | "error" | "loading"; }
interface Profile { mobile_verified: boolean; adv_id: string; name: string; email: string; mobile: string; pan: string; aadhaar?: string; gst_number?: string; city: string; state: string; head: string; category: string; password: string; bank_name?: string; branch_name?: string; bank_account?: string; ifsc?: string; pan_verified: boolean; profile_photo?: any; name_as_per_pan?: string; date_of_birth?: string; }
interface KycDetails { bank_name?: string; bank_account_number?: string; ifsc_code?: string; bank_verified: boolean; aadhaar_number?: string; aadhaar_verified: boolean; gst_number?: string; gst_verified: boolean; kyc_completed: boolean; profile_image_url?: string; phone_verified?: boolean; email_verified?: boolean; aadhaar_kyc_data?: { full_address?: string;[key: string]: any }; }

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: ["Mutual Funds", "Wealth Management", "Pension Funds", "Stocks and Securities", "Portfolio Management Services", "Real Estate Investments", "Unlisted Shares"],
    Protection: ["Life Insurance", "Health Insurance", "Motor Insurance", "Travel Insurance", "Cattle Insurance", "Marine Insurance", "Corporate Insurance"],
    Finance: ["Home Finance", "Personal Finance", "SME Finance", "EMI Solution", "Loan Against Securities", "Corporate Finance", "Mortgage Finance", "Debt Capital Market & Loan Syndication", "Asset Reconstruction", "Tax Consultancy", "Education Loan", "Business Loan"],
};

const maskAccount = (num: string) => num ? "•".repeat(Math.max(0, num.length - 4)) + num.slice(-4) : "";
const maskIFSC = (ifsc: string) => ifsc ? ifsc.slice(0, 4) + "••••" + ifsc.slice(-3) : "";
const maskPAN = (pan: string) => (pan && pan.length >= 10) ? pan.slice(0, 2) + "••••••" + pan.slice(-2) : pan;
const maskAadhaar = (num: string) => (num && num.length >= 12) ? "•••• •••• " + num.slice(-4) : num;
const maskGST = (gst: string) => (gst && gst.length >= 15) ? gst.slice(0, 2) + "••••••••••" + gst.slice(-3) : gst;

export default function ProfileSection() {
    const [currentStep, setCurrentStep] = useState(1);
    const [popups, setPopups] = useState<PopupMessage[]>([]);
    const [verifyingPan, setVerifyingPan] = useState(false);
    const [verifyingAadhaar, setVerifyingAadhaar] = useState(false);
    const [verifyingLink, setVerifyingLink] = useState(false);
    const [panAadhaarLinked, setPanAadhaarLinked] = useState<boolean | null>(null);
    const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
    const [aadhaarReferenceId, setAadhaarReferenceId] = useState("");
    const [aadhaarOtpInput, setAadhaarOtpInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isKycEditing, setIsKycEditing] = useState(false);
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
    const [aadhaarVerified, setAadhaarVerified] = useState(false);
    const [gstVerified, setGstVerified] = useState(false);
    const [isDownloadingCard, setIsDownloadingCard] = useState(false);
    const [isDownloadingDSACard, setIsDownloadingDSACard] = useState(false);
    const [verifyingGst, setVerifyingGst] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpInput, setEmailOtpInput] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);

    const removePopup = useCallback((id: string) => setPopups(prev => prev.filter(p => p.id !== id)), []);
    const triggerPopup = useCallback((message: string, type: "success" | "error" | "loading" = "success", manualId?: string) => {
        const id = manualId || Math.random().toString(36).substring(2, 9);
        setPopups(prev => {
            const exists = prev.find(p => p.id === id);
            if (exists) return prev.map(p => p.id === id ? { ...p, message, type } : p);
            return [...prev, { id, message, type }];
        });
        if (type !== "loading") setTimeout(() => removePopup(id), 4000);
        return id;
    }, [removePopup]);

    const refreshProfileData = async () => {
        try {
            const res = await DashboardService.getProfile();
            console.log("Profile data refreshed:", res);
            setPanAadhaarLinked(!!res.kycDetails?.pan_aadhaar_linked);
            if (res.user?.pan_verified && res.kycDetails?.aadhaar_verified && res.kycDetails?.bank_verified) {
                setCurrentStep(3);
            }
            setProfile({
                ...res.user,
                aadhaar: res.kycDetails?.aadhaar_number || res.user.aadhaar || "",
                gst_number: res.kycDetails?.gst_number || res.user.gst_number || "",
                bank_name: res.kycDetails?.bank_name || res.user.bank_name || "",
                bank_account: res.kycDetails?.bank_account_number || res.user.bank_account || "",
                ifsc: res.kycDetails?.ifsc_code || res.user.ifsc || ""
            });
            setKyc(res.kycDetails);
            setMobileVerified(!!res.kycDetails?.phone_verified);
            setEmailVerified(!!res.kycDetails?.email_verified);
            setBankVerified(!!res.kycDetails?.bank_verified);
            setAadhaarVerified(!!res.kycDetails?.aadhaar_verified);
            setGstVerified(!!res.kycDetails?.gst_verified);
            originalPassword.current = res.user.password;
        } catch (error) { console.error("Refresh failed:", error); }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const initFetch = async () => { setLoading(true); await refreshProfileData(); setLoading(false); };
        initFetch();
    }, []);

    const handleCheckPanAadhaarLink = async () => {
        let popupId: string;
        try {
            setVerifyingLink(true);
            popupId = triggerPopup("Checking PAN-Aadhaar link status...", "loading");
            const res = await DashboardService.verifyPanAadhaarLink();
            if (res.status === "success" || res.code === 200 || res.kycDetails?.pan_aadhaar_linked === true) {
                setPanAadhaarLinked(true);
                triggerPopup(res.message || "PAN and Aadhaar are successfully linked!", "success", popupId);
            } else {
                setPanAadhaarLinked(false);
                triggerPopup(res.message || "PAN and Aadhaar link not found.", "error", popupId);
            }
            await refreshProfileData();
        } catch (err: any) { triggerPopup("Link verification failed", "error"); } finally { setVerifyingLink(false); }
    };

    // const handleSendEmailOtp = async () => {
    //     if (!profile?.email) return triggerPopup("Email not found", "error");
    //     let popupId: string;
    //     try {
    //         setVerifyingEmail(true); popupId = triggerPopup("Sending Email OTP...", "loading");
    //         const res = await DashboardService.sendEmailOtp();
    //         if (res.status === "success" || res.code === 200) { setEmailOtpSent(true); triggerPopup("OTP sent to your email!", "success", popupId); }
    //         else triggerPopup(res.message || "Failed to send OTP", "error", popupId);
    //     } catch (err: any) { triggerPopup("Error sending OTP", "error"); } finally { setVerifyingEmail(false); }
    // };

    // const handleVerifyEmailOtp = async () => {
    //     if (emailOtpInput.length < 4) return triggerPopup("Please enter a valid OTP", "error");
    //     let popupId: string;
    //     try {
    //         setVerifyingEmail(true); popupId = triggerPopup("Verifying Email...", "loading");
    //         const res = await DashboardService.verifyEmailOtp({ otp: emailOtpInput });
    //         if (res.status === "success" || res.code === 200) { setEmailVerified(true); setEmailOtpSent(false); setEmailOtpInput(""); await refreshProfileData(); triggerPopup("Email verified!", "success", popupId); }
    //         else triggerPopup(res.message || "Invalid OTP", "error", popupId);
    //     } catch (err: any) { triggerPopup("Verification failed", "error"); } finally { setVerifyingEmail(false); }
    // };

    const handlePanVerification = async () => {
        if (!profile?.pan || !profile?.name_as_per_pan || !profile?.date_of_birth) return triggerPopup("Please enter all PAN details", "error");
        const [year, month, day] = profile.date_of_birth.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        let popupId: string;
        try {
            setVerifyingPan(true); popupId = triggerPopup("Verifying PAN...", "loading");
            const res = await DashboardService.verifyPan({ pan: profile.pan, name_as_per_pan: profile.name_as_per_pan, date_of_birth: formattedDate });
            if (res.data.status === "valid" || res.code === 200) { await refreshProfileData(); triggerPopup("PAN verified!", "success", popupId); }
            else triggerPopup(res.message || "Failed", "error", popupId);
        } catch (err: any) { triggerPopup("Verification failed", "error"); } finally { setVerifyingPan(false); }
    };

    const handleRequestAadhaarOtp = async () => {
        if (!profile?.aadhaar || profile.aadhaar.length !== 12) return triggerPopup("Enter 12-digit Aadhaar", "error");
        let popupId: string;
        try {
            setVerifyingAadhaar(true); popupId = triggerPopup("Sending OTP...", "loading");
            const res = await DashboardService.generateAadhaarOtp(profile.aadhaar);
            if (res.status === "success" || res.reference_id) { setAadhaarReferenceId(res.reference_id || res.data?.reference_id); setAadhaarOtpSent(true); triggerPopup("OTP sent successfully!", "success", popupId); }
        } catch (err: any) { triggerPopup("Error sending OTP", "error"); } finally { setVerifyingAadhaar(false); }
    };

    const handleVerifyAadhaarOtp = async () => {
        let popupId: string;
        try {
            setVerifyingAadhaar(true); popupId = triggerPopup("Verifying...", "loading");
            const res = await DashboardService.verifyAadhaarOtp({ reference_id: aadhaarReferenceId, otp: aadhaarOtpInput, aadhaar_number: profile!.aadhaar! });
            if (res.status === "success" || res.code === 200) { setAadhaarVerified(true); setAadhaarOtpSent(false); await refreshProfileData(); triggerPopup("Aadhaar Verified!", "success", popupId); }
            else triggerPopup("Invalid OTP", "error", popupId);
        } catch (err: any) { triggerPopup("Verification failed", "error"); } finally { setVerifyingAadhaar(false); }
    };

    const handleGstVerification = async () => {
        let popupId: string;
        try {
            setVerifyingGst(true); popupId = triggerPopup("Verifying GST...", "loading");
            const res = await DashboardService.verifyGst(profile!.gst_number!);
            if (res.message === "GST verified successfully" || res.data?.gst_verified === true) { setGstVerified(true); await refreshProfileData(); triggerPopup("GST Verified!", "success", popupId); }
            else triggerPopup(res.message || "GST failed", "error", popupId);
        } catch (err: any) { triggerPopup("Verification failed", "error"); } finally { setVerifyingGst(false); }
    };

    const handleBankVerification = async () => {
        if (!profile?.bank_account || !profile?.ifsc) return triggerPopup("Enter Account & IFSC", "error");
        
        // 1. Initialize popupId outside the try block so it's accessible in catch
        let popupId: string | undefined; 
    
        try {
            setVerifyingBank(true); 
            popupId = triggerPopup("Verifying bank...", "loading");
    
            const res = await DashboardService.verifyBankDetails({ 
                bank_account_number: profile.bank_account, 
                ifsc_code: profile.ifsc, 
                bank_name: profile.bank_name 
            });
    
            if (res.status === "success") { 
                setBankVerified(true); 
                await refreshProfileData(); 
                triggerPopup("Bank Verified!", "success", popupId); // Correctly uses popupId
            } else {
                triggerPopup(res.message || "Failed", "error", popupId); // Correctly uses popupId
            }
        } catch (err: any) {
            console.error("Bank verification error:", err.response?.data?.message);
            
            // FIX: Added popupId here so the loading popup is replaced/closed
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            triggerPopup(errorMessage, "error", popupId); 
        } finally {
            setVerifyingBank(false);
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1. Set local preview immediately for instant UI feedback
        const localUrl = URL.createObjectURL(file);
        setPhotoPreview(localUrl);

        const formData = new FormData();
        formData.append("profile_photo", file);
        let popupId: string;

        try {
            setUploadingPhoto(true);
            popupId = triggerPopup("Updating photo...", "loading");

            const res = await DashboardService.updateProfileImage(formData);

            if (res.profile_image_url || res.status === "success") {
                // 2. Update the timestamp to force browser to ignore old cache
                setImageTimestamp(Date.now());

                // 3. Fetch fresh data from server
                await refreshProfileData();

                triggerPopup("Photo updated!", "success", popupId);
            }
        } catch (err: any) {
            triggerPopup("Upload failed", "error");
        } finally {
            setUploadingPhoto(false);
            // 4. Clear the blob URL and let getProfileImage switch to the new timestamped URL
            setPhotoPreview(null);
        }
    };

    // --- UPDATED: Horizontal Business Card Download Logic ---
    const downloadCardAsPhoto = async () => {
        if (!profile) return;
        setIsDownloadingCard(true);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return setIsDownloadingCard(false);
        canvas.width = 1200; canvas.height = 675;
        const locationText = (kyc?.aadhaar_kyc_data?.full_address || profile.city).toUpperCase();

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

            // Phone
            drawIcon("M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2Z", leftPadding, startY);
            ctx.fillText(`+91 ${profile.mobile}`, textX, startY - 4);

            // Email
            drawIcon("M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM22 7L12 13L2 7", leftPadding, startY + gap);
            ctx.font = "bold 26px sans-serif"; ctx.fillText(profile.email.toLowerCase(), textX, startY + gap - 4);

            // Location with Text Wrapping
            drawIcon("M12 21C12 21 20 13 20 8C20 3.6 16.4 0 12 0C7.6 0 4 3.6 4 8C4 13 12 21 12 21Z", leftPadding, startY + gap * 2);
            ctx.font = "bold 24px sans-serif";

            // Wrapping Logic for Location
            const words = locationText.split(' ');
            let line = '';
            const maxWidth = 600;
            const lineHeight = 32;
            let currentY = startY + gap * 2 - 4;

            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    ctx.fillText(line, textX, currentY);
                    line = words[n] + ' ';
                    currentY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, textX, currentY);

            const link = document.createElement("a"); link.download = `${profile.name}_BusinessCard.jpg`;
            link.href = canvas.toDataURL("image/jpeg", 1); link.click();
            triggerPopup("Card downloaded successfully!", "success");
        } catch (err) { triggerPopup("Failed to generate card.", "error"); } finally { setIsDownloadingCard(false); }
    };

    // --- UPDATED: Vertical Identity Card Download Logic ---
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

        const locationText = kyc?.aadhaar_kyc_data?.full_address || profile.city;

        try {
            // 1. Draw Background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cvWidth, cvHeight);
            ctx.fillStyle = "#1CADA3";
            ctx.fillRect(0, 0, cvWidth, 15);
            ctx.fillRect(0, cvHeight - 15, cvWidth, 15);

            // 2. Load and Draw Logo
            const logo = new Image();
            logo.src = LogoImage.src;
            // Even local logos should have crossOrigin if served via CDN/Next.js Image Optimization
            logo.crossOrigin = "anonymous";
            await new Promise((res) => {
                logo.onload = res;
                logo.onerror = res;
            });
            if (logo.complete) {
                const logoW = 200;
                const logoH = 60;
                ctx.drawImage(logo, (cvWidth - logoW) / 2, 60, logoW, logoH);
            }

            // 3. Load and Draw Profile Photo (The Critical CORS Part)
            const photoX = (cvWidth - 220) / 2;
            const photoY = 180;
            const activeImg = photoPreview || kyc?.profile_image_url || null;

            if (activeImg) {
                const userPhoto = new Image();

                if (activeImg.startsWith('blob:')) {
                    // Local previews (blobs) don't need CORS or timestamps
                    userPhoto.src = activeImg;
                } else {
                    // S3 Images REQUIRE crossOrigin and a Cache-Buster timestamp 
                    // to avoid getting a cached non-CORS version from the browser
                    userPhoto.crossOrigin = "anonymous";
                    const cacheBuster = `cb=${Date.now()}`;
                    userPhoto.src = activeImg.includes('?')
                        ? `${activeImg}&${cacheBuster}`
                        : `${activeImg}?${cacheBuster}`;
                }

                await new Promise((res, rej) => {
                    userPhoto.onload = res;
                    userPhoto.onerror = (e) => {
                        console.error("Image loading failed for canvas", e);
                        res(null); // Resolve anyway to continue drawing other parts of the card
                    };
                });

                if (userPhoto.complete) {
                    // Draw photo
                    ctx.drawImage(userPhoto, photoX, photoY, 220, 260);
                    // Draw border around photo
                    ctx.strokeStyle = "#f1f5f9";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(photoX, photoY, 220, 260);
                }
            }

            // 4. Draw User Info
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

            // 5. Draw Contact Details
            const detailsStartY = 680;
            ctx.font = "bold 20px sans-serif";
            ctx.fillText(`Contact No: +91 ${profile.mobile}`, cvWidth / 2, detailsStartY);
            ctx.fillText(`Email ID: ${profile.email}`, cvWidth / 2, detailsStartY + 50);

            // 6. Draw Wrapped Location (Prevents text from going off-canvas)
            const fullLocation = `Location: ${locationText}`;
            const words = fullLocation.split(' ');
            let line = '';
            const maxWidth = 500;
            const lineHeight = 28;
            let currentY = detailsStartY + 100;

            ctx.font = "bold 20px sans-serif"; // Reset font for location
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    ctx.fillText(line, cvWidth / 2, currentY);
                    line = words[n] + ' ';
                    currentY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, cvWidth / 2, currentY);

            // 7. Footer Website
            ctx.fillStyle = "#2563eb";
            ctx.font = "bold 22px sans-serif";
            ctx.fillText("www.infinityarthvishva.com", cvWidth / 2, cvHeight - 60);

            // 8. Trigger Download
            const link = document.createElement("a");
            link.download = `${profile.name.replace(/\s+/g, '_')}_IdentityCard.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            triggerPopup("Identity Card Saved!", "success");
        } catch (e) {
            console.error("Card generation error:", e);
            triggerPopup("Failed to generate identity card. Check CORS settings.", "error");
        } finally {
            setIsDownloadingDSACard(false);
        }
    };

    const getProfileImage = () => {
        if (photoPreview) return photoPreview; // Show local preview first
        if (kyc?.profile_image_url) {
            // Append the timestamp to bust the browser cache
            return `${kyc.profile_image_url}${kyc.profile_image_url.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
        }
        return null;
    };
    const toggleHead = (head: string) => {
        const currentHeads = profile?.head ? profile.head.split(",").map(h => h.trim()).filter(Boolean) : [];
        const updated = currentHeads.includes(head) ? currentHeads.filter(h => h !== head) : [...currentHeads, head];
        setProfile(prev => prev ? { ...prev, head: updated.join(",") } : null);
    };
    const toggleCategory = (cat: string) => {
        const selectedCats = profile?.category ? profile.category.split(",") : [];
        const updated = selectedCats.includes(cat) ? selectedCats.filter(c => c !== cat) : [...selectedCats, cat];
        setProfile(prev => prev ? { ...prev, category: updated.join(",") } : null);
    };

    if (loading || !profile) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-[#1CADA3]" size={40} /></div>;

    const selectedHeads = profile.head ? profile.head.split(",") : [];
    const selectedCats = profile.category ? profile.category.split(",") : [];

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen relative">
            {/* Popups */}
            <div className="fixed top-5 right-5 z-9999 flex flex-col gap-3 pointer-events-none">
                {popups.map((p) => (
                    <div key={p.id} className={`pointer-events-auto min-w-[280px] px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300 ${p.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : p.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-bold tracking-wide">{p.message}</span>
                            <button onClick={() => removePopup(p.id)} className="text-xs font-black uppercase opacity-50">Dismiss</button>
                        </div>
                    </div>
                ))}
            </div>

            <header className="mb-5 text-center">
                <h1 className="text-3xl font-bold text-slate-700">Profile Settings</h1>

                <div className="flex justify-center items-center mt-10 gap-2 sm:gap-6">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= step ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-lg shadow-[#1cada340]" : "bg-white border-slate-200 text-slate-400"}`}>
                                    {step === 1 ? <UserCheck size={20} /> : step === 2 ? <Landmark size={20} /> : <Briefcase size={20} />}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= step ? "text-[#1CADA3]" : "text-slate-400"}`}>Step {step}</span>
                            </div>
                            {step < 3 && <div className={`w-12 sm:w-24 h-0.5 mx-2 -mt-6 transition-colors duration-500 ${currentStep > step ? "bg-[#1CADA3]" : "bg-slate-200"}`} />}
                        </div>
                    ))}
                </div>
                {/* Profile Completion Badge */}
                <div className={`flex items-center w-fit mx-auto gap-1.5 px-3 mt-7 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${kyc?.kyc_completed ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-amber-50 border-amber-200 text-amber-600"}`}>
                    {kyc?.kyc_completed ? <ShieldCheck size={12} /> : <AlertCircle size={12} />}
                    Status: {kyc?.kyc_completed ? "KYC Completed" : "KYC Incomplete"}
                </div>
            </header>

            <div className="max-w-full mx-auto">
                {currentStep === 1 && (
                    <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Phone className="text-[#1CADA3]" size={18} /> Mobile Verification</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input disabled value={profile.mobile} className="w-full px-4 py-3 rounded-xl font-bold text-slate-700 bg-slate-50 border-2 border-transparent pr-20" />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            {mobileVerified ? <span className="text-[9px] font-black uppercase px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">Verified</span> : <span className="text-[9px] font-black uppercase px-2 py-1 bg-amber-50 text-amber-600 rounded-lg">Unverified</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Mail className="text-[#1CADA3]" size={18} /> Email Verification</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input disabled value={profile.email} className="w-full px-4 py-3 rounded-xl font-bold text-slate-700 bg-slate-50 border-2 border-transparent pr-2 truncate" />
                                        {/* <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            {emailVerified ? <span className="text-[9px] font-black uppercase px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">Verified</span> : <span className="text-[9px] font-black uppercase px-2 py-1 bg-amber-50 text-amber-600 rounded-lg">Unverified</span>}
                                        </div> */}
                                    </div>
                                    {/* {!emailVerified && !emailOtpSent && <button onClick={handleSendEmailOtp} className="w-full py-3 bg-[#1CADA3] text-white font-bold rounded-xl">Send Verification OTP</button>}
                                    {emailOtpSent && !emailVerified && (
                                        <div className="flex gap-2">
                                            <input placeholder="Enter OTP" value={emailOtpInput} onChange={(e) => setEmailOtpInput(e.target.value)} className="flex-1 px-4 py-3 border-2 border-[#1CADA3] rounded-xl font-bold" />
                                            <button onClick={handleVerifyEmailOtp} className="px-6 bg-emerald-600 text-white font-bold rounded-xl">Verify</button>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><ShieldCheck className="text-[#1CADA3]" size={20} /> KYC Verification</h3>
                                    {!isKycEditing && <button onClick={() => setIsKycEditing(true)} className="text-[12px] font-black uppercase text-[#1CADA3] flex items-center gap-1"><Pencil size={14} /> Edit KYC</button>}
                                </div>
                                <div className="space-y-6">
                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                                        <div className="flex items-center justify-between"><p className="text-[10px] font-black text-slate-400 uppercase">PAN Card</p><span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${profile.pan_verified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>{profile.pan_verified ? "Verified" : "Pending"}</span></div>
                                        {isKycEditing && !profile.pan_verified ? (
                                            <div className="space-y-3">
                                                <input className="w-full text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2" placeholder="PAN Number" value={profile.pan} onChange={(e) => setProfile({ ...profile, pan: e.target.value.toUpperCase() })} />
                                                <input className="w-full text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2" placeholder="Name as per PAN" value={profile.name_as_per_pan || ""} onChange={(e) => setProfile({ ...profile, name_as_per_pan: e.target.value.toUpperCase() })} />
                                                <div className="flex gap-2"><input type="date" className="flex-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2" value={profile.date_of_birth || ""} onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })} /><button onClick={handlePanVerification} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-[10px] font-bold">Verify</button></div>
                                            </div>
                                        ) : <p className="text-[13px] font-bold text-slate-700">{profile.pan_verified ? maskPAN(profile.pan) : profile.pan || "NOT PROVIDED"}</p>}
                                    </div>
                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                                        <div className="flex items-center justify-between mb-2"><p className="text-[10px] font-black text-slate-400 uppercase">Aadhar Card</p><span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${aadhaarVerified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>{aadhaarVerified ? "Verified" : "Pending"}</span></div>
                                        {isKycEditing && !aadhaarVerified ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2"><input className="flex-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2" value={profile.aadhaar || ""} onChange={(e) => setProfile({ ...profile, aadhaar: e.target.value })} placeholder="12 digit Aadhaar" maxLength={12} /><button onClick={handleRequestAadhaarOtp} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-[10px] font-bold">Get OTP</button></div>
                                                {aadhaarOtpSent && <div className="flex gap-2"><input placeholder="OTP" value={aadhaarOtpInput} onChange={(e) => setAadhaarOtpInput(e.target.value)} className="flex-1 text-gray-700 text-[11px] font-bold px-3 py-2 rounded-lg border border-[#1CADA3] outline-none" /><button onClick={handleVerifyAadhaarOtp} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold">Verify</button></div>}
                                            </div>
                                        ) : (
                                            <p className="text-[13px] font-bold text-slate-700">{profile.aadhaar ? maskAadhaar(profile.aadhaar) : "NOT PROVIDED"}</p>
                                        )}
                                    </div>

                                    {profile.pan_verified && aadhaarVerified && (
                                        <div className="mt-4">
                                            {panAadhaarLinked === true ? (
                                                <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-[12px] font-bold">
                                                    <CheckCircle2 size={14} className="text-emerald-500" /> PAN Aadhaar is linked
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <button onClick={handleCheckPanAadhaarLink} disabled={verifyingLink} className="w-full py-3 bg-white border border-slate-200 hover:border-[#1CADA3] text-slate-600 hover:text-[#1CADA3] rounded-2xl text-[10px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm disabled:opacity-50">
                                                        {verifyingLink ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />} Check Aadhaar PAN link status
                                                    </button>
                                                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 text-[10px] font-bold leading-relaxed">
                                                        <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                                        <span>Note: You will be not eligible for the payout if pan-aadhaar is not linked</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1"><p className="text-[10px] font-black text-slate-400 uppercase">GST Registration</p><span className="text-[7px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">Optional</span></div>
                                            {isKycEditing ? <div className="flex gap-2"><input className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 w-full" value={profile.gst_number || ""} onChange={(e) => setProfile({ ...profile, gst_number: e.target.value.toUpperCase() })} placeholder="GST Number" /><button onClick={handleGstVerification} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-[10px] font-bold">Verify</button></div> : <p className="text-[13px] font-bold text-slate-700">{profile.gst_number ? maskGST(profile.gst_number) : 'NOT LINKED'}</p>}
                                        </div>
                                        <span className={`ml-4 text-[8px] font-black uppercase px-2 py-1 rounded-lg ${gstVerified ? "text-emerald-500 bg-emerald-50 border border-emerald-100" : "text-amber-500 bg-amber-50 border border-amber-100"}`}>{gstVerified ? "Verified" : "Pending"}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 mt-5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 text-[12px] font-bold leading-relaxed">
                                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                    <span>Note: GST verification is mandatory if total payout exceeds ₹20 lakh in a financial year.</span>
                                </div>
                                <div className="mt-10 flex justify-end gap-3">
                                    {isKycEditing && <button onClick={() => setIsKycEditing(false)} className="px-6 py-2 border-2 border-slate-100 text-slate-500 rounded-xl font-bold text-xs">Close Edit</button>}
                                    <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 px-10 py-4 bg-[#1CADA3] text-white rounded-2xl font-bold shadow-xl shadow-[#1cada340]">Next: Bank Payouts <ChevronRight size={18} /></button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl"><Landmark size={24} /></div>
                                    <div><h2 className="text-xl font-bold text-slate-800">Bank Payout Details</h2><p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Setup Your Commission Account</p></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${bankVerified ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-amber-600 bg-amber-50 border border-amber-100"}`}>
                                        {bankVerified ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} {bankVerified ? "Verified" : "Not Verified"}
                                    </span>
                                    {!bankVerified && (isBankEditing ? <button onClick={() => setIsBankEditing(false)} className="text-[10px] font-black uppercase text-rose-500 hover:underline"><X size={12} /> Cancel</button> : <button onClick={() => setIsBankEditing(true)} className="text-[10px] font-black uppercase text-[#1CADA3] hover:underline"><Pencil size={12} /> Edit</button>)}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Name</label><input disabled={!isBankEditing} value={profile.bank_name || ""} onChange={(e) => setProfile({ ...profile, bank_name: e.target.value.toUpperCase() })} placeholder="ENTER BANK NAME" className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Number</label><input disabled={!isBankEditing} value={isBankEditing ? profile.bank_account : maskAccount(profile.bank_account || "")} onChange={(e) => setProfile({ ...profile, bank_account: e.target.value })} placeholder="ENTER NUMBER" className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                                <div className="space-y-2 md:col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">IFSC Code</label><input disabled={!isBankEditing} value={isBankEditing ? profile.ifsc : maskIFSC(profile.ifsc || "")} onChange={(e) => setProfile({ ...profile, ifsc: e.target.value.toUpperCase() })} placeholder="ENTER IFSC CODE" className={`w-full px-5 py-4 rounded-xl text-sm font-bold tracking-widest text-slate-700 ${isBankEditing ? "bg-white border-2 border-[#1CADA3]" : "bg-slate-50"}`} /></div>
                            </div>
                            <div className="mt-12 flex flex-col gap-4">{isBankEditing && !bankVerified && <button onClick={handleBankVerification} disabled={verifyingBank} className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl uppercase text-[11px] flex items-center justify-center gap-2">{verifyingBank ? <Loader2 size={16} className="animate-spin" /> : "Verify Account Now"}</button>}</div>
                            <div className="flex justify-between mt-10 pt-10 border-t border-slate-50">
                                <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold"><ChevronLeft size={18} /> Back</button>
                                <button onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-10 py-4 bg-[#1CADA3] text-white rounded-2xl font-bold shadow-xl shadow-[#1cada340]">Final Step: Profile Assets <ChevronRight size={18} /></button>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-5 mb-10 pb-10 border-b border-slate-50">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-[30px] bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                            {uploadingPhoto ? <Loader2 className="animate-spin text-[#1CADA3]" /> : getProfileImage() ? <img src={getProfileImage()!} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" size={32} />}
                                        </div>
                                        {isEditing && <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 p-2.5 bg-[#1CADA3] text-white rounded-full shadow-lg border-2 border-white"><Camera size={14} /></button>}
                                        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" />
                                    </div>
                                    <div><h2 className="text-xl font-bold text-slate-800">Professional Expertise</h2><p className="text-[10px] font-black uppercase text-[#1CADA3] tracking-widest mt-1">Account: {profile.email}</p></div>
                                </div>
                                <div className="space-y-10">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-5">Main Head Categories</label>
                                        <div className="flex flex-wrap gap-3">
                                            {Object.keys(CATEGORY_MAP).map(head => (
                                                <button key={head} disabled={!isEditing} onClick={() => toggleHead(head)} className={`px-6 py-3 rounded-xl text-xs font-bold border-2 transition-all ${selectedHeads.includes(head) ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-lg shadow-[#1cada340]" : "bg-white border-slate-100 text-slate-500"} ${!isEditing && "opacity-80 cursor-not-allowed"}`}>{head}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        {selectedHeads.length > 0 ? selectedHeads.map(head => (
                                            <div key={head} className="p-6 border border-slate-100 rounded-2xl bg-slate-50/30">
                                                <p className="text-[10px] font-black text-[#1CADA3] uppercase mb-4">{head} Sub-Categories</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(CATEGORY_MAP[head] || []).map(cat => (
                                                        <button key={cat} disabled={!isEditing} onClick={() => toggleCategory(cat)} className={`px-4 py-2.5 rounded-lg text-[10px] font-bold transition-all ${selectedCats.includes(cat) ? "bg-[#1CADA3] text-white shadow-md" : "bg-white text-slate-500 border border-slate-100"} ${!isEditing && "opacity-80 cursor-not-allowed"}`}>{cat}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        )) : <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400 text-xs">Please select Head Categories above</div>}
                                    </div>
                                </div>
                                <div className="mt-12 flex gap-4">
                                    <button onClick={() => { setCurrentStep(2); setIsEditing(false); }} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold">Back</button>
                                    {!isEditing ? (
                                        <button onClick={() => setIsEditing(true)} className="flex-1 py-4 bg-white border-2 border-[#1CADA3] text-[#1CADA3] rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#1cada305] transition-all"><Pencil size={18} /> Edit Profile Details</button>
                                    ) : (
                                        <div className="flex-1 flex gap-3">
                                            <button onClick={() => setIsEditing(false)} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold">Cancel</button>
                                            <button disabled={saving} onClick={async () => { try { setSaving(true); await DashboardService.editProfile(profile); triggerPopup("Profile Updated Successfully!", "success"); setIsEditing(false); } catch (e) { triggerPopup("Failed to save profile", "error"); } finally { setSaving(false); } }} className="flex-1 py-4 bg-[#1CADA3] text-white rounded-2xl font-black shadow-xl shadow-[#1cada340] flex items-center justify-center gap-2">
                                                {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />} Finish & Save Profile
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Summary</h4>
                                    <span className="text-[10px] font-black text-[#1CADA3] bg-[#1cada310] px-2 py-1 rounded-md">ID: {profile.adv_id}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                    <div><p className="text-[8px] font-black text-slate-400 uppercase">Full Name</p><p className="text-xs font-bold text-slate-700 truncate">{profile.name}</p></div>

                                    {/* --- UPDATED: PROFILE SUMMARY LOCATION --- */}
                                    <div>
                                        <p className="text-[8px] font-black text-slate-400 uppercase">Location</p>
                                        <p className="text-xs font-bold text-slate-700 whitespace-normal wrap-break-word leading-relaxed">
                                            {kyc?.aadhaar_kyc_data?.full_address || `${profile.city}, ${profile.state}`}
                                        </p>
                                    </div>

                                    <div><p className="text-[8px] font-black text-slate-400 uppercase">Phone Number</p><p className="text-xs font-bold text-slate-700">+91 {profile.mobile}</p></div>
                                    <div><p className="text-[8px] font-black text-slate-400 uppercase">Registered Email</p><p className="text-xs font-bold text-slate-700 truncate">{profile.email}</p></div>
                                    {/* <div className="col-span-2"><p className="text-[8px] font-black text-slate-400 uppercase">Bank Account</p><p className="text-xs font-bold text-slate-700 truncate">{profile.bank_name} - {maskAccount(profile.bank_account || "")}</p></div> */}
                                </div>
                                <div className="pt-4 border-t border-slate-50">
                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Update Password</label>
                                    <div className="relative">
                                        <input disabled={!isEditing} type={showPassword ? "text" : "password"} value={profile.password || ""} onChange={(e) => setProfile({ ...profile, password: e.target.value })} className={`w-full border rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none transition-colors ${isEditing ? "bg-white border-[#1CADA3]" : "bg-slate-50 border-slate-100 cursor-not-allowed"}`} placeholder="Enter new password" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Digital Visiting Card</h4>
                                <div className="aspect-[1.75/1] rounded-2xl shadow-xl overflow-hidden relative border border-slate-200 bg-slate-900 group">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${CardTemplateImage.src})` }} />
                                    <div className="absolute inset-0 pl-12 pt-14 p-6 flex flex-col justify-between">
                                        <div><h4 className="text-2xl font-black text-slate-700 uppercase leading-none truncate">{profile.name}</h4><p className="text-[12px] font-bold text-slate-500 mt-2 uppercase tracking-widest">Authorized Partner</p></div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2"><Phone size={12} className="text-slate-400" strokeWidth={2.5} /><span className="text-[13px] font-bold text-slate-700">+91 {profile.mobile}</span></div>
                                            <div className="flex items-center gap-2"><Mail size={12} className="text-slate-400" strokeWidth={2.5} /><span className="text-[13px] font-bold text-slate-700 truncate">{profile.email}</span></div>

                                            {/* --- UPDATED: DIGITAL VISITING CARD LOCATION --- */}
                                            <div className="flex items-start gap-2 max-w-[220px]">
                                                <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                                                <span className="text-[11px] font-bold text-slate-700 leading-tight whitespace-normal wrap-break-word">
                                                    {kyc?.aadhaar_kyc_data?.full_address || profile.city}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2"><Globe size={12} className="text-slate-400" strokeWidth={2.5} /><span className="text-[13px] font-bold text-slate-700">www.infinityarthvishva.com</span></div>
                                        </div>
                                        <button onClick={downloadCardAsPhoto} className="opacity-0 group-hover:opacity-100 transition-all w-fit bg-slate-800 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold flex items-center gap-2 shadow-lg">{isDownloadingCard ? <Loader2 size={10} className="animate-spin" /> : <Download size={10} />} Download Card</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">DSA Identity Card</h4>
                                <div className="max-w-[280px] aspect-[1/1.58] mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl relative overflow-hidden group flex flex-col">
                                    <div className="h-2 w-full bg-[#1CADA3]"></div>
                                    <div className="p-6 flex flex-col items-center h-full">
                                        <div className="h-12 w-32 mb-6"><img src={LogoImage.src} className="w-full h-full object-contain" /></div>
                                        <div className="w-24 h-28 border-2 border-slate-100 rounded-lg overflow-hidden mb-4 bg-slate-50 flex items-center justify-center">{getProfileImage() ? <img src={getProfileImage()!} className="w-full h-full object-cover" /> : <div className="text-slate-300 font-bold text-[8px] uppercase text-center p-2">No Photo</div>}</div>
                                        <div className="text-center mb-4"><h4 className="text-md font-black text-blue-600 uppercase leading-tight">{profile.name}</h4><p className="text-[9px] font-bold text-slate-500 uppercase">Authorized Partner</p><p className="text-[9px] font-bold text-slate-700 mt-1">Partner ID - {profile.adv_id}</p></div>
                                        <div className="w-full text-center space-y-1 border-t border-slate-100 pt-4 mb-4">
                                            <p className="text-[11px] font-bold text-slate-700"><span className="text-slate-400">Contact:</span> +91 {profile.mobile}</p>

                                            {/* --- UPDATED: DSA IDENTITY CARD LOCATION --- */}
                                            <p className="text-[10px] font-bold text-slate-700 px-2 leading-tight whitespace-normal wrap-break-word">
                                                <span className="text-slate-400">Location:</span> {kyc?.aadhaar_kyc_data?.full_address || profile.city}
                                            </p>
                                        </div>
                                        <div className="mt-auto pt-2"><p className="text-[9px] font-bold text-blue-600">www.infinityarthvishva.com</p></div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4"><button onClick={downloadDSACardAsPhoto} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 transition-transform hover:scale-105">{isDownloadingDSACard ? <Loader2 size={14} className="animate-spin" /> : "Download ID Card"}</button></div>
                                    </div>
                                    <div className="h-2 w-full bg-[#1CADA3] mt-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}