"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, LockKeyhole, ArrowRight, KeyRound, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import { PublicService } from "@/app/services/publicService";
import { useRouter } from "next/navigation";
import { useModal } from "../../context/ModalContext";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            when: "beforeChildren" as const,
            staggerChildren: 0.1
        }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [loginMethod, setLoginMethod] = useState<'OTP' | 'PASSWORD' | 'FORGOT'>('OTP');
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Forgot Password State
    const [forgotStep, setForgotStep] = useState(1); // 1: Mobile, 2: OTP, 3: New Password
    const [newPassword, setNewPassword] = useState("");

    // UI State
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const { openSignup } = useModal();

    const phoneRegex = /^[0-9]{10}$/;

    // Reset state when switching methods
    const handleMethodSwitch = (method: 'OTP' | 'PASSWORD' | 'FORGOT') => {
        setLoginMethod(method);
        setError("");
        setIsSuccess(false);
        setOtpSent(false);
        setOtp("");
        setPassword("");
        setNewPassword("");
        setForgotStep(1);
        if (method !== 'FORGOT') setEmailOrPhone("");
    };

    // 1. WEB OTP API
    useEffect(() => {
        if ((otpSent || (loginMethod === 'FORGOT' && forgotStep === 2)) && "OTPCredential" in window) {
            const ac = new AbortController();
            navigator.credentials
                .get({
                    // @ts-ignore
                    otp: { transport: ["sms"] },
                    signal: ac.signal,
                })
                .then((content: any) => {
                    if (content && content.code) {
                        setOtp(content.code);
                    }
                })
                .catch((err) => console.log("Web OTP API not triggered", err));
            return () => ac.abort();
        }
    }, [otpSent, loginMethod, forgotStep]);

    // 🔹 SUCCESS LOGIN WITH FCM INTEGRATION
    const handleSuccessLogin = async (data: any) => {
        if (data?.token) {
            document.cookie = `authToken=${data.token}; path=/; SameSite=Lax`;

            /* try {
                const { getFirebaseMessaging } = await import("@/app/lib/firebase");
                const { getToken } = await import("firebase/messaging");

                const messaging = await getFirebaseMessaging();

                if (messaging) {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        const token = await getToken(messaging, {
                            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                        });

                        if (token) {
                            await AuthService.registerFcmToken(token, "web");
                        }
                    }
                }
            } catch (err) {
                console.error("FCM Registration failed:", err);
            } */
            redirectByRole(data.user.role);
            onClose();
        }
    };

    const handleResendOtp = async () => {
        if (otpTimer > 0 || loading) return;
        setError("");
        setLoading(true);
        try {
            if (loginMethod === 'FORGOT') {
                await PublicService.sendOtp({ mobile: emailOrPhone });
            } else {
                await AuthService.sendLoginOtp({ identifier: emailOrPhone });
            }
            setOtpTimer(45);
            setOtp("");
            inputRefs.current[0]?.focus();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    // 2. FORM SUBMISSION
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSuccess(false);
        setLoading(true);

        try {
            if (loginMethod === 'FORGOT') {
                if (forgotStep === 1) {
                    if (!phoneRegex.test(emailOrPhone)) throw new Error("Please enter a valid 10-digit phone number.");
                    await PublicService.sendOtp({ mobile: emailOrPhone });
                    setForgotStep(2);
                    setOtpTimer(45);
                    setOtp("");
                } else if (forgotStep === 2) {
                    if (otp.length !== 6) throw new Error("Please enter the complete 6-digit OTP.");
                    await PublicService.verifyOtp({ mobile: emailOrPhone, otp });
                    setForgotStep(3);
                } else if (forgotStep === 3) {
                    if (newPassword.length < 6) throw new Error("Password must be at least 6 characters");
                    await AuthService.updatePassword({ identifier: emailOrPhone, newPassword });
                    setLoginMethod('PASSWORD');
                    setIsSuccess(true);
                    setError("Password updated! Please login.");
                }
                setLoading(false);
                return;
            }

            if (loginMethod === 'PASSWORD') {
                if (!emailOrPhone) {
                    setError("Please enter your identifier.");
                    setLoading(false);
                    return;
                }

                let processedIdentifier = emailOrPhone.trim();
                if (/^ADV[\s_.-]?\d+$/i.test(processedIdentifier)) {
                    const digits = processedIdentifier.match(/\d+/)?.[0];
                    processedIdentifier = `ADV_${digits}`;
                }
                else if (/^\d+$/.test(processedIdentifier) && processedIdentifier.length !== 10) {
                    processedIdentifier = `ADV_${processedIdentifier}`;
                }

                const data = await AuthService.login({ identifier: processedIdentifier, password });
                handleSuccessLogin(data);
                setLoading(false);
                return;
            }

            if (!phoneRegex.test(emailOrPhone)) {
                setError("Please enter a valid 10-digit phone number.");
                setLoading(false);
                return;
            }

            if (!otpSent) {
                await AuthService.sendLoginOtp({ identifier: emailOrPhone });
                setOtpSent(true);
                setOtpTimer(45);
                setLoading(false);
                return;
            }

            if (otp.length !== 6) {
                setError("Please enter the complete 6-digit OTP.");
                setLoading(false);
                return;
            }

            const data = await AuthService.verifyLoginOtp({ identifier: emailOrPhone, otp });
            handleSuccessLogin(data);

        } catch (err: any) {
            setIsSuccess(false);
            setError(err?.response?.data?.message || err.message || "Action failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    type UserRole = "ADMIN" | "DEPARTMENTHEAD" | "RM" | "ACCOUNTS" | "CUSTOMER" | "UNLISTEDADMIN" | "HR" | "USER" | "DIRECTOR";

    const redirectByRole = (role: UserRole) => {
        const routes: Record<UserRole, string> = {
            ADMIN: "/admin",
            DEPARTMENTHEAD: "/departmenthead",
            RM: "/rm",
            ACCOUNTS: "/accounts",
            CUSTOMER: "/customer",
            HR: "/hr",
            USER: "/dashboard",
            UNLISTEDADMIN: "/UnlistedAdmin",
            DIRECTOR: "/director"
        };
        router.push(routes[role] ?? "/dashboard");
    };

    useEffect(() => {
        if (otpTimer === 0) return;
        const interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [otpTimer]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = otp.split("");
        if (value.length > 1) {
            const chars = value.split("").slice(0, 6);
            setOtp(chars.join(""));
            inputRefs.current[Math.min(chars.length, 5)]?.focus();
            return;
        }
        newOtp[index] = value;
        setOtp(newOtp.join(""));
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pastedData) {
            setOtp(pastedData);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
                    <motion.div
                        variants={containerVariants} initial={{ scale: 0.9, opacity: 0, y: -20 }} animate="visible" exit="exit"
                        className="relative w-full max-w-[95%] sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3]" />

                        {loginMethod === 'FORGOT' && (
                            <button
                                onClick={() => {
                                    if (forgotStep > 1) setForgotStep(forgotStep - 1);
                                    else handleMethodSwitch('PASSWORD');
                                }}
                                className="absolute top-4 left-4 p-2 text-gray-400 hover:text-[#2076C7] transition-colors z-10"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10">
                            <X size={20} />
                        </button>
                        <div className="p-6 sm:p-8 pt-10">
                            <motion.div variants={itemVariants} className="text-center mb-6">
                                <div className="mx-auto w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-[#2076C7]">
                                    {loginMethod === 'FORGOT' ? <LockKeyhole size={28} /> : (loginMethod === 'PASSWORD' ? <KeyRound size={28} /> : <Smartphone size={28} />)}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                    {loginMethod === 'FORGOT'
                                        ? (forgotStep === 1 ? "Reset Password" : forgotStep === 2 ? "Verify OTP" : "Set New Password")
                                        : (otpSent ? "Verify Identity" : "Welcome Back")}
                                </h2>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                    {loginMethod === 'FORGOT'
                                        ? (forgotStep === 2 ? `Enter code sent to ${emailOrPhone}` : "Securely update your account access.")
                                        : (otpSent ? `Enter the code sent to ${emailOrPhone}` : "Select your preferred login method.")}
                                </p>
                            </motion.div>

                            {loginMethod !== 'FORGOT' && !otpSent && (
                                <motion.div variants={itemVariants} className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                    <button type="button" onClick={() => handleMethodSwitch('OTP')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMethod === 'OTP' ? "bg-white text-[#2076C7] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                        <Smartphone size={16} /> OTP
                                    </button>
                                    <button type="button" onClick={() => handleMethodSwitch('PASSWORD')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMethod === 'PASSWORD' ? "bg-white text-[#2076C7] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                        <KeyRound size={16} /> Password
                                    </button>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {((loginMethod !== 'PASSWORD' && !otpSent && forgotStep === 1) || (loginMethod === 'PASSWORD')) && (
                                    <motion.div variants={itemVariants} className="relative group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                            {loginMethod === 'OTP' || loginMethod === 'FORGOT' ? 'Phone Number' : 'Email, Phone or ADV ID'}
                                        </label>
                                        <input
                                            type="text"
                                            value={emailOrPhone}
                                            disabled={otpSent || (loginMethod === 'FORGOT' && forgotStep > 1)}
                                            onChange={(e) => (loginMethod === 'OTP' || loginMethod === 'FORGOT') ? setEmailOrPhone(e.target.value.replace(/\D/g, "").slice(0, 10)) : setEmailOrPhone(e.target.value)}
                                            placeholder={(loginMethod === 'OTP' || loginMethod === 'FORGOT') ? "Enter 10-digit number" : "ADV_123 or Email or Phone"}
                                            className="w-full h-11 sm:h-12 px-4 border font-sans text-gray-700 placeholder-gray-400 rounded-xl text-base transition-all duration-200 outline-none bg-white border-gray-300 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 disabled:bg-gray-50"
                                        />
                                    </motion.div>
                                )}

                                {loginMethod === 'PASSWORD' && (
                                    <motion.div variants={itemVariants} className="relative group">
                                        <div className="flex justify-between items-center mb-1.5 ml-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Password</label>
                                            <button
                                                type="button"
                                                onClick={() => handleMethodSwitch('FORGOT')}
                                                className="text-[#2076C7] text-xs font-semibold hover:underline cursor-pointer">
                                                Forgot Password?
                                            </button>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                className="w-full h-12 px-4 pr-12 border font-sans text-gray-700 placeholder-gray-400 rounded-xl text-base outline-none bg-white border-gray-300 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#2076C7]">
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {loginMethod === 'FORGOT' && forgotStep === 3 && (
                                    <motion.div variants={itemVariants} className="relative group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">New Password</label>
                                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 6 characters"
                                            className="w-full h-11 sm:h-12 px-4 border font-sans text-gray-700 placeholder-gray-400 rounded-xl text-base transition-all duration-200 outline-none bg-white border-gray-300 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10" />
                                    </motion.div>
                                )}

                                {((otpSent && loginMethod === 'OTP') || (loginMethod === 'FORGOT' && forgotStep === 2)) && (
                                    <motion.div variants={itemVariants} className="space-y-3">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide px-1">Enter OTP</label>
                                        <div className="flex justify-between gap-1" onPaste={handlePaste}>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <input key={index} ref={(el) => { inputRefs.current[index] = el }} type="text" inputMode="numeric" maxLength={index === 0 ? 6 : 1} value={otp[index] || ""} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-10 h-12 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-lg sm:text-xl font-semibold bg-white focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/20 transition-all duration-200 shadow-xs text-gray-800" />
                                            ))}
                                        </div>
                                        <div className="flex justify-center items-center mt-2">
                                            <p className="text-xs text-gray-500">
                                                Didn't receive the code?{" "}
                                                {otpTimer > 0 ? (
                                                    <span className="text-[#2076C7] font-semibold">Resend in {otpTimer}s</span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        className="text-[#2076C7] font-bold hover:underline cursor-pointer"
                                                    >
                                                        Resend Now
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg border ${isSuccess ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                                        <p className={`${isSuccess ? "text-green-600" : "text-red-600"} text-sm text-center font-medium`}>{error}</p>
                                    </motion.div>
                                )}

                                <motion.button variants={itemVariants} type="submit" disabled={loading}
                                    className={`w-full h-12 rounded-xl text-white font-semibold text-base shadow-lg bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:brightness-105 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? "opacity-80 cursor-wait" : "cursor-pointer"}`}>
                                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                                        <>
                                            {loginMethod === 'FORGOT' ? (forgotStep === 1 ? "Send OTP" : forgotStep === 2 ? "Verify OTP" : "Update Password") : (loginMethod === 'PASSWORD' ? "Login" : (otpSent ? "Verify & Login" : "Get OTP"))}
                                            {!loading && !otpSent && loginMethod !== 'PASSWORD' && (loginMethod === 'FORGOT' ? forgotStep === 1 : true) && <ArrowRight size={18} />}
                                        </>
                                    )}
                                </motion.button>

                                {/* Signup Link */}
                                <motion.div variants={itemVariants} className="text-center mt-4">
                                    <p className="text-sm text-gray-500">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onClose();
                                                openSignup();
                                            }}
                                            className="text-[#2076C7] font-semibold hover:underline">
                                            Signup
                                        </button>
                                    </p>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Login;