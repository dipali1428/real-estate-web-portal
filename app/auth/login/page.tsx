"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, LockKeyhole, ArrowRight, KeyRound } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import { useRouter } from "next/navigation";

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
    const [loginMethod, setLoginMethod] = useState<'OTP' | 'PASSWORD'>('OTP');

    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    // UI State
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Reset state when switching methods
    const handleMethodSwitch = (method: 'OTP' | 'PASSWORD') => {
        setLoginMethod(method);
        setError("");
        setOtpSent(false);
        setOtp("");
        setPassword("");
    };

    // 1. WEB OTP API (Auto-Read SMS on Android)
    useEffect(() => {
        if (otpSent && "OTPCredential" in window) {
            const ac = new AbortController();

            navigator.credentials
                .get({
                    // @ts-ignore - OTPCredential is experimental in some TS versions
                    otp: { transport: ["sms"] },
                    signal: ac.signal,
                })
                .then((content: any) => {
                    if (content && content.code) {
                        setOtp(content.code);
                    }
                })
                .catch((err) => console.log("Web OTP API not triggered or aborted", err));

            return () => {
                ac.abort();
            };
        }
    }, [otpSent]);

    const handleSuccessLogin = (data: any) => {
        if (data?.token) {
            document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            redirectByRole(data.user.role);
            onClose();
        }
    };

    // 2. FORM SUBMISSION
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        setLoading(true);

        try {
            // SCENARIO 1: PASSWORD LOGIN
            if (loginMethod === 'PASSWORD') {
                if (!emailOrPhone) {
                    setError("Please enter your email or phone.");
                    setLoading(false);
                    return;
                }
                if (!password) {
                    setError("Please enter your password.");
                    setLoading(false);
                    return;
                }

                // Call the requested AuthService structure
                const data = await AuthService.login({
                    identifier: emailOrPhone,
                    password: password,
                });

                handleSuccessLogin(data);
                setLoading(false);
                return;
            }

            // SCENARIO 2: OTP LOGIN

            // Validate Phone for OTP flow
            if (!phoneRegex.test(emailOrPhone)) {
                setError("Please enter a valid 10-digit phone number for OTP login.");
                setLoading(false);
                return;
            }

            // STEP 1: SEND OTP
            if (!otpSent) {
                await AuthService.sendLoginOtp({ identifier: emailOrPhone });
                setOtpSent(true);
                setOtpTimer(30);
                setLoading(false);
                return;
            }

            // STEP 2: VERIFY OTP
            if (otp.length !== 6) {
                setError("Please enter the complete 6-digit OTP.");
                setLoading(false);
                return;
            }

            const data = await AuthService.verifyLoginOtp({
                identifier: emailOrPhone,
                otp: otp,
            });

            handleSuccessLogin(data);

        } catch (err: any) {
            console.error("Login Error:", err);
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const redirectByRole = (role: string) => {
        if (role === "ADMIN") router.push("/admin");
        else if (role === "DEPARTMENTHEAD") router.push("/departmenthead");
        else if (role === "RM") router.push("/rm");
        else router.push("/dashboard");
    };

    // OPT Timer
    useEffect(() => {
        if (otpTimer === 0) return;
        const interval = setInterval(() => {
            setOtpTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [otpTimer]);

    // 3. OTP INPUT LOGIC
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
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pastedData) {
            setOtp(pastedData);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    // 4. RENDER
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
                    <motion.div
                        variants={containerVariants}
                        initial={{ scale: 0.9, opacity: 0, y: -20 }}
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-[95%] sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

                        {/* Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3]" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10">
                            <X size={20} />
                        </button>

                        <div className="p-6 sm:p-8 pt-10">

                            {/* Icon & Title */}
                            <motion.div variants={itemVariants} className="text-center mb-6">
                                <div className="mx-auto w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-[#2076C7]">
                                    {loginMethod === 'PASSWORD' ? <KeyRound size={28} /> : (otpSent ? <LockKeyhole size={28} /> : <Smartphone size={28} />)}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                    {otpSent ? "Verify Identity" : "Welcome Back"}
                                </h2>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                    {otpSent
                                        ? `Enter the code sent to ${emailOrPhone}`
                                        : "Select your preferred login method."}
                                </p>
                            </motion.div>

                            {/* METHOD TOGGLE TABS (Hide if OTP is already sent to avoid confusion) */}
                            {!otpSent && (
                                <motion.div variants={itemVariants} className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                    <button
                                        type="button"
                                        onClick={() => handleMethodSwitch('OTP')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMethod === 'OTP'
                                            ? "bg-white text-[#2076C7] shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}>
                                        <Smartphone size={16} /> With OTP
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMethodSwitch('PASSWORD')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMethod === 'PASSWORD'
                                            ? "bg-white text-[#2076C7] shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}>
                                        <KeyRound size={16} /> With Password
                                    </button>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Step 1: Identifier Input */}
                                <motion.div variants={itemVariants} className="relative group">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                        {loginMethod === 'OTP' ? 'Phone Number' : 'Email or Phone'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            inputMode={loginMethod === 'OTP' ? "numeric" : "text"}
                                            value={emailOrPhone}
                                            disabled={otpSent}
                                            onChange={(e) => {
                                                // If OTP mode, strictly enforce numbers. 
                                                // If Password mode, allow typical identifier characters.
                                                if (loginMethod === 'OTP') {
                                                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                                    setEmailOrPhone(value);
                                                } else {
                                                    setEmailOrPhone(e.target.value.toLowerCase());
                                                }
                                            }}
                                            placeholder={loginMethod === 'OTP' ? "Enter 10-digit number" : "Enter email or phone"}
                                            className={`w-full h-11 sm:h-12 px-4 border font-sans text-gray-700 placeholder-gray-400 rounded-xl text-base transition-all duration-200 outline-none
                                                ${otpSent
                                                    ? "bg-gray-50 text-gray-500 border-gray-200"
                                                    : "bg-white border-gray-300 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10"
                                                }`}
                                        />
                                        {otpSent && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOtpSent(false);
                                                    setOtp("");
                                                    setError("");
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#2076C7] hover:bg-blue-50 px-2 py-1 rounded-md transition-colors cursor-pointer">
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </motion.div>

                                {/* PASSWORD INPUT (Only for Password Method) */}
                                {loginMethod === 'PASSWORD' && (
                                    <motion.div variants={itemVariants} className="relative group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full h-11 sm:h-12 px-4 border font-sans text-gray-700 placeholder-gray-400 rounded-xl text-base transition-all duration-200 outline-none bg-white border-gray-300 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10"
                                        />
                                    </motion.div>
                                )}

                                {/* OTP INPUT (Conditional - Only if OTP Sent) */}
                                {otpSent && loginMethod === 'OTP' && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                Enter OTP
                                            </label>
                                        </div>

                                        <div className="flex justify-between gap-1" onPaste={handlePaste}>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => { inputRefs.current[index] = el }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete={index === 0 ? "one-time-code" : "off"}
                                                    maxLength={index === 0 ? 6 : 1}
                                                    value={otp[index] || ""}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-10 h-12 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-lg sm:text-xl font-semibold bg-white font-sans
                                                        focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/20 focus:outline-none 
                                                        transition-all duration-200 shadow-xs text-gray-800 caret-[#2076C7]"
                                                />
                                            ))}
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                disabled={otpTimer > 0}
                                                onClick={async () => {
                                                    await AuthService.sendLoginOtp({ identifier: emailOrPhone });
                                                    setOtpTimer(30);
                                                }}
                                                className={`text-sm font-medium transition-colors duration-200 
                                                    ${otpTimer > 0 ? "text-red-400 cursor-not-allowed" : "text-[#2076C7] hover:underline"}`}>
                                                {otpTimer > 0 ? `Resend code in ${otpTimer}s` : "Didn't receive code? Resend"}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 rounded-lg bg-red-50 border border-red-100">
                                        <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                                    </motion.div>
                                )}

                                {/* Action Button */}
                                <motion.button
                                    variants={itemVariants}
                                    type="submit"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className={`w-full h-12 rounded-xl text-white font-semibold text-base shadow-lg shadow-blue-500/20 
                                        bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:brightness-105 transition-all duration-300
                                        flex items-center justify-center cursor-pointer gap-2 ${loading ? "opacity-80 cursor-wait" : ""}`}>
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {/* Button Text changes based on State */}
                                            {loginMethod === 'PASSWORD'
                                                ? "Login"
                                                : (otpSent ? "Verify & Login" : "Get OTP")}
                                            {!loading && !otpSent && loginMethod === 'OTP' && <ArrowRight size={18} />}
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Login;