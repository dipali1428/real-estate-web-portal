"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import { useRouter } from "next/navigation";

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [useOtp, setUseOtp] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [passwordOrOtp, setPasswordOrOtp] = useState("");

    const [isForgot, setIsForgot] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const [passwordUpdated, setPasswordUpdated] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
            setError("Please enter a valid email address or 10-digit phone number.");
            return;
        }

        // RUN ONLY IF NOT FORGOT MODE
        if (!isForgot) {
            if (!useOtp && passwordOrOtp.length < 8) {
                setError("Password must be at least 8 characters long.");
                return;
            }

            if (useOtp && passwordOrOtp.length !== 6) {
                setError("Please enter a valid 6-digit OTP.");
                return;
            }
        }


        // ---- FORGOT PASSWORD FLOW ----
        if (isForgot) {
            if (!isVerified) {
                setError("Please verify your email or mobile first.");
                return;
            }

            if (newPassword.length < 8) {
                setError("New password must be at least 8 characters.");
                return;
            }

            setLoading(true);

            try {
                await AuthService.updatePassword({
                    identifier: emailOrPhone,
                    newPassword,
                });

                setError("");

                // RESET STATES
                setIsForgot(false);
                setIsVerified(false);
                setNewPassword("");

                setPasswordUpdated(true);       // Show success message inside modal
                setTimeout(() => setPasswordUpdated(false), 4000);

                return;
            } catch (err: any) {
                setError(err?.response?.data?.message || "Could not update password.");
            } finally {
                setLoading(false);
            }

            return;
        }

        setError("");
        setLoading(true);

        try {
            const data = await AuthService.login({
                identifier: emailOrPhone,
                password: passwordOrOtp,
            });
            // console.log("--------->", data);

            if (data?.token) {
                document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Lax`;
                if (data.role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            }
            onClose();

        } catch (err: any) {
            console.error("Login Error:", err);
            setError(
                err?.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-[90%] sm:w-full max-w-md p-6 max-h-screen overflow-y-auto text-sm sm:text-base">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer">
                            <X size={20} />
                        </button>

                        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Login to Your Account
                        </h2>
                        <p className="text-gray-500 text-center mb-6 text-xs sm:text-sm">
                            Welcome back! Please login to continue.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm sm:text-sm font-medium text-gray-700 mb-1 pl-1">
                                    Email or Phone
                                </label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={emailOrPhone}
                                        onChange={(e) => {
                                            let value = e.target.value.trim();

                                            // If starts with a digit → treat as mobile number
                                            if (/^\d/.test(value)) {
                                                value = value.replace(/\D/g, "");
                                                value = value.slice(0, 10);
                                            }

                                            // If it's an email → lowercase it
                                            if (emailRegex.test(value)) {
                                                value = value.toLowerCase();
                                            }
                                            setEmailOrPhone(value);
                                            setIsVerified(false);
                                        }}
                                        placeholder="Enter email or phone number"
                                        className="w-full border border-gray-300 rounded-lg px-2 pr-10 py-2 focus:ring-2 focus:ring-[#1CADA3] focus:outline-none text-gray-800 placeholder:text-gray-400"
                                    />

                                    {/* VERIFY BUTTON ONLY IN FORGOT MODE */}
                                    {isForgot && (
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                setError("");

                                                if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
                                                    setError("Enter valid email or mobile.");
                                                    return;
                                                }

                                                setVerifying(true);
                                                try {
                                                    await AuthService.verifyUser({ identifier: emailOrPhone });
                                                    setIsVerified(true);
                                                } catch (err: any) {
                                                    setIsVerified(false);
                                                    setError(err?.response?.data?.message || "Account not found.");
                                                }
                                                setVerifying(false);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2076C7] text-white text-xs px-2 py-2 h-7 flex items-center rounded-md shadow">
                                            {verifying ? "..." : isVerified ? "✔" : "Verify"}
                                        </button>
                                    )}
                                </div>
                            </div>


                            <div>
                                {!isForgot && (
                                    <label className="block text-sm sm:text-sm font-medium text-gray-700 mb-1 pl-1">
                                        {useOtp ? "OTP" : "Password"}
                                    </label>
                                )}

                                {/* PASSWORD FIELD (Normal login mode only) */}
                                {!isForgot && (
                                    <div>
                                        <input
                                            type={useOtp ? "number" : "password"}
                                            value={passwordOrOtp}
                                            onChange={(e) => setPasswordOrOtp(e.target.value)}
                                            placeholder={useOtp ? "Enter 6-digit OTP" : "Enter your password"}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1CADA3] focus:outline-none text-gray-800 placeholder:text-gray-400"
                                        />
                                    </div>
                                )}

                                {/* NEW PASSWORD FIELD (Forgot mode → only after verify) */}
                                {isVerified && (
                                    <div>
                                        <label className="block text-sm sm:text-sm font-medium text-gray-700 mb-1 pl-1">
                                            {"Update Password"}
                                        </label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1CADA3] focus:outline-none text-gray-800 placeholder:text-gray-400"
                                        />
                                    </div>
                                )}
                                
                                {passwordUpdated && (
                                    <p className="text-green-600 text-sm mt-2">
                                        Password updated! Please login with your new password.
                                    </p>
                                )}
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex justify-end">
                                {/* {!isForgot && (
                                    <label className="text-sm sm:text-sm text-gray-600 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={useOtp}
                                            onChange={() => setUseOtp(!useOtp)}
                                            className="accent-[#2076C7]"
                                        />
                                        Login with OTP instead
                                    </label>
                                )} */}

                                {!useOtp && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsForgot(!isForgot);
                                            setIsVerified(false);
                                            setPasswordOrOtp("");
                                            setNewPassword("");
                                            setError("");
                                        }}
                                        className={`${!isForgot ? "" : "ml-auto"} text-sm sm:text-sm text-[#2076C7] hover:underline`}>
                                        Forgot Password?
                                    </button>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                disabled={loading}
                                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer text-sm sm:text-sm">
                                {loading
                                    ? "Please wait..."
                                    : useOtp
                                        ? "Verify OTP"
                                        : "Login"}
                            </motion.button>
                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Login;
