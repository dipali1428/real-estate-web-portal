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

        if (!useOtp && passwordOrOtp.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (useOtp && passwordOrOtp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const data = await AuthService.login({
                identifier: emailOrPhone,
                password: passwordOrOtp,
            });

            console.log("✅ Login Success:", data);

            if (data?.token) {
                // ❗ VERY IMPORTANT → Save token in cookie (not localStorage)
                document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Lax`;

                // Redirect to dashboard
                router.push("/dashboard");
            }

            // Close modal
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
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer">
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-center mb-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Login to Your Account
                        </h2>
                        <p className="text-gray-500 text-center mb-6">
                            Welcome back! Please login to continue.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                                    Email or Phone
                                </label>
                                <input
                                    type="text"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    placeholder="Enter your email or phone number"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1CADA3] focus:outline-none text-gray-800 placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                                    {useOtp ? "OTP" : "Password"}
                                </label>
                                <input
                                    type={useOtp ? "number" : "password"}
                                    value={passwordOrOtp}
                                    onChange={(e) => setPasswordOrOtp(e.target.value)}
                                    placeholder={useOtp ? "Enter 6-digit OTP" : "Enter your password"}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1CADA3] focus:outline-none text-gray-800 placeholder:text-gray-400"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex justify-between items-center">
                                <label className="text-sm text-gray-600 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={useOtp}
                                        onChange={() => setUseOtp(!useOtp)}
                                        className="accent-[#2076C7]"
                                    />
                                    Login with OTP instead
                                </label>

                                {!useOtp && (
                                    <a href="#" className="text-sm text-[#2076C7] hover:underline">
                                        Forgot Password?
                                    </a>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                disabled={loading}
                                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
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
