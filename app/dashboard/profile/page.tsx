"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import CardTemplateImage from "@/app/assets/Bussiness_Card2.png";
import { Phone, Mail, MapPin, Globe, Landmark, Pencil, CheckCircle2, User, AlertCircle, Loader2, Camera, Eye, EyeOff, X, ShieldCheck, Download, Lock, Copy, Share2 } from "lucide-react";
import LogoImage from "@/public/logo.png";

// --- Types & Constants ---
interface PopupMessage { id: string; message: string; type: "success" | "error" | "loading"; }
interface Profile { referral_code?: string; mobile_verified: boolean; adv_id: string; name: string; email: string; mobile: string; pan: string; aadhaar?: string; gst_number?: string; city: string; state: string; head: string; category: string; password: string; bank_name?: string; branch_name?: string; bank_account?: string; ifsc?: string; pan_verified: boolean; profile_photo?: any; name_as_per_pan?: string; date_of_birth?: string; }
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
    const [popups, setPopups] = useState<PopupMessage[]>([]);
    const [verifyingPan, setVerifyingPan] = useState(false);
    const [verifyingAadhaar, setVerifyingAadhaar] = useState(false);
    const [verifyingLink, setVerifyingLink] = useState(false);
    const [panAadhaarLinked, setPanAadhaarLinked] = useState<boolean | null>(null);
    const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
    const [aadhaarReferenceId, setAadhaarReferenceId] = useState("");
    const [aadhaarOtpInput, setAadhaarOtpInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
    const [activeId, setActiveId] = useState<string>("step-1");

    const isStep1Complete = mobileVerified && emailVerified;
    const isStep2Complete = isStep1Complete && (profile?.pan_verified && aadhaarVerified);
    const isStep3Complete = isStep2Complete && bankVerified;

    const [referralLink, setReferralLink] = useState<string>("");
    const [referralCode, setReferralCode] = useState<string>("");
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);



    useEffect(() => {
        if (loading || !profile) return;

        // Narrowed rootMargin to detect elements when they are in the top 30% of the screen
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Find all entries currently in the "active" zone
            const intersecting = entries.filter(entry => entry.isIntersecting);

            if (intersecting.length > 0) {
                // If multiple are intersecting, pick the one whose top is highest in the viewport
                const closest = intersecting.reduce((prev, curr) => {
                    return prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr;
                });
                setActiveId(closest.target.id);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sectionIds = ["profile-summary", "step-1", "step-2", "step-3", "step-4"];

        // Slight delay to ensure DOM is rendered
        const timeoutId = setTimeout(() => {
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
        }, 500);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [loading, profile]);


    const handleCopyReferral = () => {
        navigator.clipboard.writeText(referralLink);
        triggerPopup("Referral link copied!", "success");
    };

    const handleGenerateReferral = async () => {
        try {
            setIsGeneratingLink(true);
            // Call the actual API service
            const res = await DashboardService.getRefLink();

            // Use the link from the API response (adjust 'referral_link' based on your actual API response key)
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
            console.error("Referral Error:", e);
            triggerPopup("Failed to generate link", "error");
        } finally {
            setIsGeneratingLink(false);
        }
    };


    const handleShareReferral = async () => {
        let currentLink = referralLink;

        // 1. If link doesn't exist, or you want to ensure it's fresh, call the API
        try {
            setIsGeneratingLink(true);
            const res = await DashboardService.getRefLink();
            if (res.referral_link) {
                currentLink = res.referral_link;
                setReferralLink(res.referral_link);
                setReferralCode(res.referral_code);
            }
        } catch (e) {
            console.error("Referral Error:", e);
            triggerPopup("Failed to prepare referral link", "error");
            return;
        } finally {
            setIsGeneratingLink(false);
        }

        // 2. Trigger the Share Dialog
        if (navigator.share && currentLink) {
            try {
                await navigator.share({
                    title: 'Join Infinity Arthvishva',
                    text: 'Become a partner with Infinity Arthvishva.',
                    url: currentLink,
                });
            } catch (err) {
                // Fallback if user cancels or share fails
                console.log("Share cancelled or failed");
            }
        } else if (currentLink) {
            // Fallback to copy if Web Share API is not supported (e.g., some desktop browsers)
            handleCopyReferral();
        }
    };

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

            setPanAadhaarLinked(!!res.kycDetails?.pan_aadhaar_linked);
            // 1. Extract DOB from Aadhaar KYC data if available
            const aadhaarDob = res.kycDetails?.aadhaar_kyc_data?.date_of_birth; // "13-11-2001"
            let finalDob = res.user.date_of_birth || "";

            // 2. Format DD-MM-YYYY to YYYY-MM-DD for the input field
            if (aadhaarDob && aadhaarDob.includes("-")) {
                const [day, month, year] = aadhaarDob.split("-");
                finalDob = `${year}-${month}-${day}`;
            }

            setProfile({
                ...res.user,
                date_of_birth: finalDob,
                aadhaar: res.kycDetails?.aadhaar_number || res.user.aadhaar || "",
                gst_number: res.kycDetails?.gst_number || res.user.gst_number || "",
                bank_name: res.kycDetails?.bank_name || res.user.bank_name || "",
                bank_account: res.kycDetails?.bank_account_number || res.user.bank_account || "",
                ifsc: res.kycDetails?.ifsc_code || res.user.ifsc || ""
            });
            if (res.user.referral_code) {
                // Adjust the domain to your actual production URL
                const baseUrl = window.location.origin;
                setReferralLink(`${res.user.referral_link}`);
                setReferralCode(`${res.user.referral_code}`);
            }
            setKyc(res.kycDetails);
            // || !!res.kycDetails?.phone_verified
            setMobileVerified(true);
            setEmailVerified(!!res.user?.email_verified || !!res.kycDetails?.email_verified);
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
        let popupId = "";
        try {
            setVerifyingLink(true);
            popupId = triggerPopup("Checking PAN-Aadhaar link status...", "loading");

            const res = await DashboardService.verifyPanAadhaarLink();

            // UPDATED SUCCESS LOGIC:
            // Your API returns success data inside 'res.data'
            const isSuccess =
                res.data?.pan_aadhaar_linked === true ||
                res.message?.toLowerCase().includes("linked") ||
                res.status === "success";

            if (isSuccess) {
                setPanAadhaarLinked(true);
                // This now triggers the Green popup correctly
                triggerPopup(res.message || "PAN and Aadhaar are successfully linked!", "success", popupId);

                // Refresh data in background without affecting the popup
                refreshProfileData().catch(e => console.error("Refresh failed", e));
            } else {
                setPanAadhaarLinked(false);
                triggerPopup(res.message || "PAN and Aadhaar link not found.", "error", popupId);
            }
        } catch (err: any) {
            triggerPopup("Link verification failed", "error", popupId);
        } finally {
            setVerifyingLink(false);
        }
    };

    const handleSendEmailOtp = async () => {
        if (!profile?.email) return triggerPopup("Email not found", "error");
        let popupId: string;
        try {
            setVerifyingEmail(true);
            popupId = triggerPopup("Sending Email OTP...", "loading");
            const res = await DashboardService.sendEmailOtp();
            if (res.message?.includes("successfully") || res.status === "success" || res.code === 200) {
                setEmailOtpSent(true);
                triggerPopup("OTP sent to your email!", "success", popupId);
            } else {
                triggerPopup(res.message || "Failed to send OTP", "error", popupId);
            }
        } catch (err: any) { triggerPopup("Error sending OTP", "error"); } finally { setVerifyingEmail(false); }
    };

    const handleVerifyEmailOtp = async () => {
        if (emailOtpInput.length < 4) return triggerPopup("Please enter a valid OTP", "error");
        let popupId: string;
        try {
            setVerifyingEmail(true); popupId = triggerPopup("Verifying Email...", "loading");
            const res = await DashboardService.verifyEmailOtp({ otp: emailOtpInput });
            if (res.status === "success" || res.code === 200 || res.message === "Email verified successfully") { setEmailVerified(true); setEmailOtpSent(false); setEmailOtpInput(""); await refreshProfileData(); triggerPopup("Email verified!", "success", popupId); }
            else triggerPopup(res.message || "Invalid OTP", "error", popupId);
        } catch (err: any) { triggerPopup("Verification failed", "error"); } finally { setVerifyingEmail(false); }
    };

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
                triggerPopup("Bank Verified!", "success", popupId);
            } else {
                triggerPopup(res.message || "Failed", "error", popupId);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            triggerPopup(errorMessage, "error", popupId);
        } finally {
            setVerifyingBank(false);
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
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
                setImageTimestamp(Date.now());
                await refreshProfileData();
                triggerPopup("Photo updated!", "success", popupId);
            }
        } catch (err: any) { triggerPopup("Upload failed", "error"); } finally {
            setUploadingPhoto(false);
            setPhotoPreview(null);
        }
    };

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
            drawIcon("M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2Z", leftPadding, startY);
            ctx.fillText(`+91 ${profile.mobile}`, textX, startY - 4);
            drawIcon("M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM22 7L12 13L2 7", leftPadding, startY + gap);
            ctx.font = "bold 26px sans-serif"; ctx.fillText(profile.email.toLowerCase(), textX, startY + gap - 4);
            drawIcon("M12 21C12 21 20 13 20 8C20 3.6 16.4 0 12 0C7.6 0 4 3.6 4 8C4 13 12 21 12 21Z", leftPadding, startY + gap * 2);
            ctx.font = "bold 24px sans-serif";
            const words = locationText.split(' ');
            let line = ''; const maxWidth = 600; const lineHeight = 32; let currentY = startY + gap * 2 - 4;
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) { ctx.fillText(line, textX, currentY); line = words[n] + ' '; currentY += lineHeight; } else { line = testLine; }
            }
            ctx.fillText(line, textX, currentY);
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
        const cvWidth = 600; const cvHeight = 950;
        canvas.width = cvWidth; canvas.height = cvHeight;
        const locationText = kyc?.aadhaar_kyc_data?.full_address || profile.city;
        try {
            ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, cvWidth, cvHeight);
            ctx.fillStyle = "#1CADA3"; ctx.fillRect(0, 0, cvWidth, 15); ctx.fillRect(0, cvHeight - 15, cvWidth, 15);
            const logo = new Image(); logo.src = LogoImage.src; logo.crossOrigin = "anonymous";
            await new Promise((res) => { logo.onload = res; logo.onerror = res; });
            if (logo.complete) { const logoW = 200; const logoH = 60; ctx.drawImage(logo, (cvWidth - logoW) / 2, 60, logoW, logoH); }
            const photoX = (cvWidth - 220) / 2; const photoY = 180;
            const activeImg = photoPreview || kyc?.profile_image_url || null;
            if (activeImg) {
                const userPhoto = new Image();
                if (activeImg.startsWith('blob:')) { userPhoto.src = activeImg; } else {
                    userPhoto.crossOrigin = "anonymous";
                    const cacheBuster = `cb=${Date.now()}`;
                    userPhoto.src = activeImg.includes('?') ? `${activeImg}&${cacheBuster}` : `${activeImg}?${cacheBuster}`;
                }
                await new Promise((res) => { userPhoto.onload = res; userPhoto.onerror = () => res(null); });
                if (userPhoto.complete) { ctx.drawImage(userPhoto, photoX, photoY, 220, 260); ctx.strokeStyle = "#f1f5f9"; ctx.lineWidth = 4; ctx.strokeRect(photoX, photoY, 220, 260); }
            }
            ctx.textAlign = "center"; ctx.fillStyle = "#2563eb"; ctx.font = "bold 38px sans-serif";
            ctx.fillText(profile.name.toUpperCase(), cvWidth / 2, 520);
            ctx.fillStyle = "#64748b"; ctx.font = "bold 24px sans-serif"; ctx.fillText("Authorized Partner", cvWidth / 2, 560);
            ctx.fillStyle = "#334155"; ctx.font = "bold 24px sans-serif"; ctx.fillText(`Partner ID - ${profile.adv_id}`, cvWidth / 2, 600);
            const detailsStartY = 680; ctx.font = "bold 20px sans-serif";
            ctx.fillText(`Contact No: +91 ${profile.mobile}`, cvWidth / 2, detailsStartY);
            ctx.fillText(`Email ID: ${profile.email}`, cvWidth / 2, detailsStartY + 50);
            const fullLocation = `Location: ${locationText}`; const words = fullLocation.split(' ');
            let line = ''; const maxWidth = 500; const lineHeight = 28; let currentY = detailsStartY + 100;
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) { ctx.fillText(line, cvWidth / 2, currentY); line = words[n] + ' '; currentY += lineHeight; } else { line = testLine; }
            }
            ctx.fillText(line, cvWidth / 2, currentY);
            ctx.fillStyle = "#2563eb"; ctx.font = "bold 22px sans-serif"; ctx.fillText("www.infinityarthvishva.com", cvWidth / 2, cvHeight - 60);
            const link = document.createElement("a"); link.download = `${profile.name.replace(/\s+/g, '_')}_IdentityCard.png`;
            link.href = canvas.toDataURL("image/png", 1.0); link.click();
            triggerPopup("Identity Card Saved!", "success");
        } catch (e) { triggerPopup("Failed to generate identity card.", "error"); } finally { setIsDownloadingDSACard(false); }
    };

    const getProfileImage = () => {
        if (photoPreview) return photoPreview;
        if (kyc?.profile_image_url) return `${kyc.profile_image_url}${kyc.profile_image_url.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
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
        <main className="max-w-7xl xl:mr-72 xl:ml-32 px-4 md:pb-60 sm:pb-20 pb-15 bg-[#F8FAFC] min-h-screen relative font-sans">
            <div className="max-[1180px]:relative sticky top-[10px] mx-5 z-50 py-3 flex items-center justify-start gap-4">
                {kyc?.kyc_completed ? (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-emerald-100 rounded-2xl shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-700">Profile Completed</span>
                        <ShieldCheck size={14} className="text-emerald-500 ml-1" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-amber-100 rounded-2xl shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-700">Status: Incomplete</span>
                        <AlertCircle size={14} className="text-amber-500 ml-1" />
                    </div>
                )}
            </div>

            <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none w-[calc(100%-40px)] sm:w-auto">
                {popups.map((p) => (
                    <div key={p.id} className={`pointer-events-auto min-w-[280px] px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300 ${p.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : p.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-bold">{p.message}</span>
                            <button onClick={() => removePopup(p.id)} className="text-xs font-black opacity-50">X</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-10 sm:space-y-16">
                {isStep3Complete && (
                    <section id="profile-summary" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="sticky top-0 z-40 bg-[#F8FAFC] py-4 sm:py-6 flex items-center justify-center gap-4 mb-2 border-b border-slate-100/50">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-[#2076C7] shadow-lg shadow-[#1cada330]">
                                <User size={18} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Expertise & Profile</h2>
                        </div>
                        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
                            <div className="lg:col-span-4">
                                <div className="lg:col-span-4 bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 text-slate-800 border border-slate-100 shadow-xl shadow-slate-200/40 h-fit z-30">
                                    <h4 className="text-[10px] font-black uppercase text-[#1CADA3] tracking-widest mb-6 sm:mb-8">Onboarding Summary</h4>
                                    <div className="space-y-6">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 mb-5 pb-5 border-b border-slate-50">
                                            <div className="relative">
                                                <div className="w-24 h-24 rounded-[24px] sm:rounded-[30px] bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                                    {uploadingPhoto ? <Loader2 className="animate-spin text-[#1CADA3]" /> : getProfileImage() ? <img src={getProfileImage()!} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" size={32} />}
                                                </div>
                                                <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 p-2 bg-[#1CADA3] text-white rounded-full shadow-lg border-2 border-white"><Camera size={12} /></button>
                                                <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-sans font-medium text-slate-800">{profile.name}</h2>
                                                <p className="text-[12px] font-bold uppercase text-[#1CADA3] tracking-widest mt-1">Partner ID: {profile.adv_id}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Mobile Number</p><p className="font-medium text-md text-slate-800 text-sm">{profile.mobile}</p></div>
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Email</p><p className="font-medium text-md text-slate-800 truncate text-sm">{profile.email}</p></div>
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Location</p><p className="font-medium text-slate-800 text-sm">{kyc?.aadhaar_kyc_data?.full_address || `${profile.city}, ${profile.state}`}</p></div>
                                            {/* <div><p className="text-[10px] font-black text-slate-400 uppercase">Commission Pay-out Account</p><p className="font-medium text-slate-600 text-sm">{maskAccount(profile.bank_account || "")} ({profile.ifsc})</p></div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                                    <h4 className="text-[13px] font-bold uppercase text-[#ffffff] tracking-widest mb-2">Referral Program</h4>
                                    <p className="text-[13px] font-sans text-white font-medium mb-6">Invite your partners to this platform.</p>

                                    <div className="space-y-4">
                                        {!referralLink && !profile.referral_code ? (
                                            <button
                                                onClick={handleGenerateReferral}
                                                disabled={isGeneratingLink}
                                                className="w-full py-3.5 bg-white text-[#1CADA3] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50"
                                            >
                                                {isGeneratingLink ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                                                Generate Referral Link
                                            </button>
                                        ) : (
                                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                                {/* Updated Link Field with Integrated Copy Icon */}
                                                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Your Referral Code</span>
                                                        <p className="text-[16px] font-mono font-medium text-slate-600 truncate">
                                                            {referralCode}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={handleCopyReferral}
                                                        className="p-2 text-slate-400 hover:text-[#1CADA3] hover:bg-white rounded-lg transition-all active:scale-90 border border-transparent hover:border-slate-100 shadow-sm"
                                                        title="Copy Link"
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                    <button
                                                        disabled={isGeneratingLink}
                                                        onClick={handleShareReferral}
                                                        className="p-3 bg-[#1CADA3] text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                                                        aria-label="Share"
                                                    >
                                                        {isGeneratingLink ? <Loader2 size={20} className="animate-spin" /> : <Share2 size={20} />}
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
                                <div className="p-5 sm:p-7 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 bg-[#2076C7] rounded-full" />
                                            <label className="text-[14px] font-bold uppercase text-slate-600 tracking-wide">Main Expertise</label>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.keys(CATEGORY_MAP).map((head) => {
                                                const isActive = selectedHeads.includes(head);
                                                return (
                                                    <button key={head} onClick={() => toggleHead(head)} className={`px-3 sm:px-4 py-2 rounded-lg text-[11px] sm:text-[12px] font-bold border transition-all ${isActive ? "bg-[#2076C7] border-[#2076C7] text-white shadow-md shadow-blue-100" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                                                        {head}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedHeads.filter((head) => head && CATEGORY_MAP[head]).map((head) => (
                                            <div key={head} className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">

                                                <div className="flex flex-wrap gap-1.5">
                                                    <div className="min-w-full sm:min-w-full pt-1">
                                                        <p className="text-[11px] sm:text-[14px] font-bold text-gray-600 uppercase mb-3 tracking-wide">{head} Categories</p>
                                                    </div>
                                                    {CATEGORY_MAP[head].map((cat) => (
                                                        <button
                                                            key={cat}
                                                            // 1. Disable click logic
                                                            onClick={isEditing ? () => toggleCategory(cat) : undefined}
                                                            className={`px-3 py-1.5 rounded-md text-[10px] sm:text-[14px] font-medium transition-all 
                                                            ${selectedCats.includes(cat)
                                                                    ? "bg-blue-100 text-gray-700"
                                                                    : "bg-white text-slate-600 border border-slate-200"
                                                                }
                                                                // 2. Visual difference: Lock hover effects and change opacity
                                                                ${!isEditing
                                                                    ? "opacity-80 cursor-default border-dashed"
                                                                    : "hover:border-[#1CADA3] cursor-pointer"
                                                                }
                                                            `}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div className="mt-3 space-y-2">
                                        <label className="text-[14px] font-bold text-slate-600 uppercase tracking-wider block">
                                            Current Address
                                        </label>
                                        <textarea
                                            disabled={!isEditing}
                                            value={profile.address || ""}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            rows={1}
                                            className={`w-full border rounded-xl px-4 py-2.5 text-[14px] font-bold outline-none transition-all resize-none 
                                                ${!isEditing
                                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                                    : 'bg-white border-slate-300 text-slate-700 focus:border-[#2076C7] shadow-sm'
                                                }`}
                                            placeholder="Enter your full current address"
                                        />
                                    </div> */}
                                    <div className="pt-3 border-t border-slate-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                            {/* Password Input Field */}
                                            <div className="mt-3 space-y-2">
                                                <label className="text-[14px] font-bold text-slate-600 uppercase tracking-wider block">Update Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        disabled={!isEditing}
                                                        value={profile.password || ""}
                                                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                                        className={`w-full border rounded-xl px-4 py-2.5 text-xs font-bold outline-none transition-all 
                                                            ${!isEditing
                                                                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed select-none' // Clearly locked
                                                                : 'bg-white border-slate-300 text-slate-700 focus:border-[#2076C7] shadow-sm'
                                                            }`}
                                                        placeholder={`${!isEditing ? '••••••••' : ''}`}
                                                    />
                                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                                                </div>
                                            </div>

                                            {/* Buttons Container */}
                                            <div className="h-[42px]">
                                                {!isEditing ? (
                                                    /* --- EDIT BUTTON (Full Width) --- */
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="w-full h-full px-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200/50 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                                                    >
                                                        <Pencil size={18} />
                                                        <span>Edit Profile</span>
                                                    </button>
                                                ) : (
                                                    /* --- CANCEL & SAVE BUTTONS (Side by Side) --- */
                                                    <div className="flex gap-3 h-full animate-in fade-in slide-in-from-right-4 duration-300">
                                                        <button
                                                            onClick={() => {
                                                                setIsEditing(false);
                                                                refreshProfileData(); // Reverts local changes by re-fetching
                                                            }}
                                                            className="flex-1 px-4 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <X size={18} />
                                                            <span>Cancel</span>
                                                        </button>

                                                        <button
                                                            disabled={saving}
                                                            onClick={async () => {
                                                                try {
                                                                    setSaving(true);
                                                                    await DashboardService.editProfile(profile);
                                                                    triggerPopup("Profile Updated!", "success");
                                                                    setIsEditing(false);
                                                                } catch (e) {
                                                                    triggerPopup("Update failed", "error");
                                                                } finally {
                                                                    setSaving(false);
                                                                }
                                                            }}
                                                            className="flex-[1.5] px-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200/50 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                                                        >
                                                            {saving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                                                            <span>Save Changes</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section id="step-1" className="transition-all duration-500 scroll-mt-10">
                    <div className="sticky top-0 z-30 bg-[#F8FAFC] py-4 sm:py-6 flex items-center justify-center gap-3 sm:gap-4 mb-2 border-b border-slate-100/50">
                        <span className={`px-3 sm:px-4 py-1.5 rounded-full flex items-center justify-center font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-white ${isStep1Complete ? "bg-emerald-500" : "bg-[#2076C7]"}`}>Step 1</span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center">Mobile & Email Verification</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-sm">
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-widest">Phone Number</label>
                            <div className="relative">
                                <input disabled value={profile.mobile} className="w-full px-4 sm:px-5 py-3 sm:py-3 rounded-xl font-sans sm:rounded-2xl font-bold text-slate-700 bg-white border-1 border-slate-200 text-[14px]" />
                                <div className="absolute right-4 inset-y-0 flex items-center">
                                    {mobileVerified ? <CheckCircle2 className="text-emerald-500" size={18} /> : <AlertCircle className="text-amber-500" size={18} />}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-widest">Email Address</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1">
                                    <input disabled value={profile.email} className="w-full px-4 sm:px-5 sm:pr-10 py-3 sm:py-3 font-sans rounded-xl sm:rounded-2xl font-bold text-slate-700 bg-white border-1 border-slate-200 text-sm truncate" />
                                    <div className="absolute right-4 inset-y-0 flex items-center">
                                        {emailVerified ? <CheckCircle2 className="text-emerald-500" size={18} /> : <AlertCircle className="text-amber-500" size={18} />}
                                    </div>
                                </div>
                                {!emailVerified && !emailOtpSent && (
                                    <button
                                        onClick={handleSendEmailOtp}
                                        className="w-full sm:w-auto px-4 py-1.5 bg-[#1CADA3] text-white font-bold rounded-lg text-xs hover:bg-[#158f87] transition-colors self-center"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>
                            {emailOtpSent && !emailVerified && (
                                <div className="flex flex-col sm:flex-row gap-2 items-center animate-in slide-in-from-top-2 text-gray-700 mt-2">
                                    <input
                                        placeholder="Enter OTP"
                                        value={emailOtpInput}
                                        onChange={(e) => setEmailOtpInput(e.target.value)}
                                        className="flex-1 w-full px-4 py-2 border border-slate-200 rounded-lg font-bold text-sm"
                                    />
                                    <button
                                        onClick={handleVerifyEmailOtp}
                                        className="w-full sm:w-auto px-4 py-2 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* STEP 2: IDENTITY (PAN & AADHAAR) */}
                <section id="step-2" className="transition-all duration-500 scroll-mt-10 relative">
                    {!isStep1Complete && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-xl border flex items-center gap-2 font-bold text-xs text-slate-600">
                                <Lock size={14} /> Complete Step 1 to Unlock
                            </div>
                        </div>
                    )}
                    <div className="sticky top-0 z-30 bg-[#F8FAFC] py-3 sm:py-4 flex items-center justify-center gap-3 mb-2 border-b border-slate-100/50">
                        <span className={`px-3 py-1 rounded-full flex items-center justify-center font-black text-[9px] uppercase tracking-widest text-white ${isStep2Complete ? "bg-emerald-500" : "bg-[#2076C7]"}`}>
                            Step 2
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">KYC Verification</h2>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-[24px] border border-slate-100 space-y-4">

                    {/* Aadhaar Block */}
                        <div className="p-4 bg-white rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Aadhaar Verification</h4>
                                {aadhaarVerified && <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black">VERIFIED</span>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        disabled={aadhaarVerified}
                                        value={aadhaarVerified ? maskAadhaar(profile.aadhaar || "") : profile.aadhaar}
                                        onChange={(e) => setProfile({ ...profile, aadhaar: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 text-sm outline-none"
                                        placeholder="12 Digit Aadhaar Number"
                                        maxLength={12}
                                    />
                                    {!aadhaarVerified && (
                                        <button onClick={handleRequestAadhaarOtp} className="bg-[#1CADA3] text-white px-4 py-2 rounded-lg font-bold text-xs">
                                            Get OTP
                                        </button>
                                    )}
                                </div>
                                {aadhaarOtpSent && !aadhaarVerified && (
                                    <div className="flex flex-col sm:flex-row gap-2 animate-in slide-in-from-top-2">
                                        <input
                                            placeholder="Enter Aadhaar OTP"
                                            value={aadhaarOtpInput}
                                            onChange={(e) => setAadhaarOtpInput(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-[#1CADA3] text-slate-700 rounded-lg font-bold text-sm outline-none"
                                        />
                                        <button onClick={handleVerifyAadhaarOtp} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">
                                            Verify OTP
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PAN Block */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-slate-100">
                            <div className="md:col-span-3 flex justify-between items-center">
                                <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Permanent Account Number (PAN)</h4>
                                {profile.pan_verified && <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black">VERIFIED</span>}
                            </div>

                            <input
                                disabled={profile.pan_verified}
                                value={profile.pan_verified ? maskPAN(profile.pan || "") : profile.pan || ""}
                                onChange={(e) => setProfile({ ...profile, pan: e.target.value.toUpperCase() })}
                                className="px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 outline-none text-sm disabled:bg-slate-50"
                                placeholder="PAN Number"
                            />

                            <input
                                disabled={profile.pan_verified}
                                value={
                                    profile.pan_verified
                                        ? (profile.name?.toUpperCase() || "")
                                        : (profile.name_as_per_pan || "")
                                }
                                onChange={(e) => setProfile({ ...profile, name_as_per_pan: e.target.value.toUpperCase() })}

                                className="px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 outline-none text-sm disabled:bg-slate-50 disabled:text-slate-600"
                                placeholder="Name as per PAN"
                            />

                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    disabled={profile.pan_verified}
                                    // Changed: Always show the state value so the user can see what they are typing
                                    value={profile.date_of_birth || ""}
                                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                                    className="flex-1 px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 text-sm outline-none disabled:bg-slate-50"
                                />
                                {!profile.pan_verified && (
                                    <button
                                        onClick={handlePanVerification}
                                        className="bg-[#1CADA3] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#158f87]"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>
                        </div>

                        {profile.pan_verified && aadhaarVerified && (
                            <div className="mt-2">
                                {panAadhaarLinked === true ? (
                                    <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-[11px] font-bold">
                                        <CheckCircle2 size={12} /> PAN Aadhaar is linked
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <button onClick={handleCheckPanAadhaarLink} className="w-full py-2 mt-5 mb-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2">
                                            <ShieldCheck size={12} /> Check Aadhaar PAN link status
                                        </button>
                                        <div className="flex items-start gap-2 p-3 bg-amber-50 border mb-5 border-amber-100 rounded-xl text-amber-700 text-[11px] font-bold leading-tight">
                                            <AlertCircle size={12} className="shrink-0" />
                                            <span>Note: Payout requires linked PAN-Aadhaar</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* GST Block */}
                        <div className="p-4 bg-white rounded-xl border border-slate-100">
                            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-3">GST Details (Optional)</h4>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    disabled={gstVerified}
                                    value={profile.gst_number || ""}
                                    onChange={(e) => setProfile({ ...profile, gst_number: e.target.value.toUpperCase() })}
                                    className="flex-1 px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 text-sm outline-none"
                                    placeholder="GST Number"
                                />
                                {!gstVerified ? (
                                    <button onClick={handleGstVerification} className="bg-[#1CADA3] text-white px-4 py-2 rounded-lg font-bold text-xs">
                                        Verify
                                    </button>
                                ) : (
                                    <span className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg font-black text-[10px] flex items-center justify-center">VERIFIED</span>
                                )}
                            </div>
                            <div className="flex items-start gap-2 p-3 mt-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-[12px] sm:text-[11px] font-bold leading-relaxed">
                                <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                <span>Note: GST verification is mandatory if total payout exceeds ₹20 lakh in a financial year.</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="step-3" className="transition-all duration-500 scroll-mt-10 relative">
                    {!isStep2Complete && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-xl border flex items-center gap-2 font-bold text-xs text-slate-600">
                                <Lock size={14} /> Complete Step 2
                            </div>
                        </div>
                    )}

                    <div className="sticky top-0 z-30 bg-[#F8FAFC] py-3 sm:py-4 flex items-center justify-center gap-3 mb-2 border-b border-slate-100/50">
                        <span className={`px-3 py-1 rounded-full flex items-center justify-center font-black text-[9px] uppercase tracking-widest text-white ${isStep3Complete ? "bg-emerald-500" : "bg-[#2076C7]"}`}>
                            Step 3
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800 text-center">Bank Payout Setup</h2>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Bank Account Details</h4>
                            {bankVerified && (
                                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full">
                                    <CheckCircle2 size={12} className="shrink-0" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">Verified</span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Bank Name</label>
                                <input
                                    disabled={bankVerified}
                                    value={profile.bank_name || ""}
                                    onChange={(e) => setProfile({ ...profile, bank_name: e.target.value.toUpperCase() })}
                                    className="w-full px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border-1 border-gray-300 focus:border-[#2076C7] outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Account Number</label>
                                <input
                                    disabled={bankVerified}
                                    value={bankVerified ? maskAccount(profile.bank_account || "") : profile.bank_account}
                                    onChange={(e) => setProfile({ ...profile, bank_account: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border-1 border-gray-300 focus:border-[#2076C7] outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">IFSC Code</label>
                                <input
                                    disabled={bankVerified}
                                    value={bankVerified ? maskIFSC(profile.ifsc || "") : profile.ifsc}
                                    onChange={(e) => setProfile({ ...profile, ifsc: e.target.value.toUpperCase() })}
                                    className="w-full px-3 py-2 rounded-lg font-bold text-slate-700 bg-white border-1 border-gray-300 focus:border-[#2076C7] outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        {!bankVerified && (
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleBankVerification}
                                    className="px-10 py-2.5 bg-[#1CADA3] text-white font-bold rounded-lg shadow-lg shadow-[#1cada340] flex items-center justify-center gap-2 text-sm hover:bg-[#158f87] transition-all"
                                >
                                    {verifyingBank ? <Loader2 className="animate-spin" size={16} /> : <Landmark size={16} />}
                                    Verify Account
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {isStep3Complete && (
                    <section id="step-4" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 scroll-mt-10">
                        <div className="sticky top-0 z-30 bg-[#F8FAFC] py-4 sm:py-6 flex items-center justify-center gap-3 sm:gap-4 mb-2 border-b border-slate-100/50">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-[#2076C7]">
                                <User size={18} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center">Identity Assets</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Digital Visiting Card</h4>
                                <div className="aspect-[1.75/1] rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden relative border border-slate-200 bg-slate-900 group">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${CardTemplateImage.src})` }} />
                                    <div className="absolute inset-0 px-6 sm:pl-10 pt-8 sm:pt-12 p-4 sm:p-6 flex flex-col justify-between">
                                        <div><h4 className="text-lg sm:text-2xl font-black text-slate-700 uppercase leading-none truncate">{profile.name}</h4><p className="text-[10px] sm:text-[12px] font-bold text-slate-500 mt-1 sm:mt-2 uppercase tracking-widest">Authorized Partner</p></div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <div className="flex items-center gap-2"><Phone size={10} className="text-slate-400" /><span className="text-[11px] sm:text-[13px] font-bold text-slate-700">+91 {profile.mobile}</span></div>
                                            <div className="flex items-center gap-2"><Mail size={10} className="text-slate-400" /><span className="text-[11px] sm:text-[13px] font-bold text-slate-700 truncate">{profile.email}</span></div>
                                            <div className="flex items-start gap-2 max-w-[180px] sm:max-w-[220px]"><MapPin size={10} className="text-slate-400 mt-0.5 shrink-0" /><span className="text-[9px] sm:text-[11px] font-bold text-slate-700 leading-tight truncate-2-lines">{kyc?.aadhaar_kyc_data?.full_address || profile.city}</span></div>
                                            <div className="flex items-center gap-2"><Globe size={10} className="text-slate-400" /><span className="text-[11px] sm:text-[13px] font-bold text-slate-700">www.infinityarthvishva.com</span></div>
                                        </div>
                                        <button onClick={downloadCardAsPhoto} className="w-fit bg-slate-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 shadow-lg">{isDownloadingCard ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} Save Card</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 sm:ml-20">
                                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 text-left">DSA Identity Card</h4>
                                <div className="max-w-[260px] sm:max-w-[280px] aspect-[1/1.58] lg:ml-0 mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl relative overflow-hidden group flex flex-col">
                                    <div className="h-2 w-full bg-[#1CADA3]"></div>
                                    <div className="p-5 sm:p-6 flex flex-col items-center h-full">
                                        <div className="h-10 sm:h-12 w-28 sm:w-32 mb-4 sm:mb-6"><img src={LogoImage.src} className="w-full h-full object-contain" /></div>
                                        <div className="w-20 h-24 sm:w-24 sm:h-28 border-2 border-slate-100 rounded-lg overflow-hidden mb-4 bg-slate-50 flex items-center justify-center">{getProfileImage() ? <img src={getProfileImage()!} className="w-full h-full object-cover" /> : <div className="text-slate-300 font-bold text-[8px] uppercase text-center p-2">No Photo</div>}</div>
                                        <div className="text-center mb-4"><h4 className="text-sm sm:text-md font-black text-blue-600 uppercase leading-tight">{profile.name}</h4><p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase">Authorized Partner</p><p className="text-[8px] sm:text-[9px] font-bold text-slate-700 mt-1">Partner ID - {profile.adv_id}</p></div>
                                        <div className="w-full text-center space-y-1 border-t border-slate-100 pt-4 mb-4">
                                            <p className="text-[10px] sm:text-[11px] font-bold text-slate-700">+91 {profile.mobile}</p>
                                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-700 px-2 leading-tight truncate-2-lines">{kyc?.aadhaar_kyc_data?.full_address || profile.city}</p>
                                        </div>
                                        <div className="mt-auto pt-2"><p className="text-[8px] sm:text-[9px] font-bold text-blue-600">www.infinityarthvishva.com</p></div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                            <button onClick={downloadDSACardAsPhoto} className="bg-[#1CADA3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">{isDownloadingDSACard ? <Loader2 size={14} className="animate-spin" /> : "Download ID"}</button>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-[#1CADA3] mt-auto"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <aside className="hidden xl:flex fixed right-10 top-1/2 -translate-y-1/2 z-50 flex-col items-end">
                <div className="relative flex flex-col gap-20 pr-6">
                    <div className="absolute right-[14px] top-0 bottom-0 w-[1.5px] bg-slate-200/50" />
                    {[
                        { id: "profile-summary", label: "Profile", done: isStep3Complete, active: isStep3Complete },
                        { id: "step-1", label: "Contact", done: isStep1Complete, active: true },
                        { id: "step-2", label: "KYC", done: isStep2Complete, active: isStep1Complete },
                        { id: "step-3", label: "Banking", done: isStep3Complete, active: isStep2Complete },
                        { id: "step-4", label: "Identity", done: isStep3Complete, active: isStep3Complete },
                    ].map((step, idx) => {
                        const isCurrentlyViewing = activeId === step.id;
                        return (
                            <a key={step.id} href={`#${step.id}`} className={`group relative flex items-center justify-end gap-8 transition-all duration-500 ${!step.active ? 'opacity-20 cursor-not-allowed' : 'opacity-100'} ${isCurrentlyViewing ? 'translate-x-[-12px]' : 'hover:translate-x-[-4px]'}`}>
                                <div className="flex flex-col items-end text-right">
                                    <span className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${isCurrentlyViewing ? "text-[#2076C7] scale-110" : step.done ? "text-emerald-600" : "text-slate-400"}`}>{step.label}</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 px-2 py-0.5 rounded transition-all duration-500 ${isCurrentlyViewing ? "bg-[#2076C7] text-white" : step.done ? "text-emerald-500" : "text-slate-400 opacity-0"}`}>{step.done ? "Verified" : isCurrentlyViewing ? "Pending" : ""}</span>
                                </div>
                                <div className="relative z-10 flex items-center justify-center">
                                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${isCurrentlyViewing ? "bg-[#2076C7] border-[#2076C7] text-white scale-125 shadow-lg shadow-blue-200" : step.done ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-200 text-slate-300"}`}>
                                        {step.done ? <CheckCircle2 size={14} strokeWidth={3} /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </aside>
        </main>
    );
}

function setReferralCode(arg0: string) {
    throw new Error("Function not implemented.");
}
