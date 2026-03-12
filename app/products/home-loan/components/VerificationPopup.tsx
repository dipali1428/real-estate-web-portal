"use client";

import { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, User, Mail, Smartphone, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from "@/app/services/authService";

interface VerificationPopupProps {
    offerTitle: string;
    onSuccess: (userData: { name: string; email: string; mobile: string }) => void;
    onCancel: () => void;
}

export default function VerificationPopup({ offerTitle, onSuccess, onCancel }: VerificationPopupProps) {
    const [step, setStep] = useState<"details" | "otp">("details");
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    };

    const handleSendOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!formData.name || !formData.email || formData.mobile.length !== 10) return setError("Please fill all details correctly.");
        setIsLoading(true);
        setError("");
        try {
            await AuthService.sendLoginOtp({ identifier: formData.mobile });
            setStep("otp");
            setTimer(30);
        } catch {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join("");
        if (otpString.length < 6) return setError("Enter the 6-digit OTP code.");
        setIsLoading(true);
        setError("");
        try {
            await AuthService.verifyLoginOtp({ identifier: formData.mobile, otp: otpString });
            onSuccess(formData);
        } catch {
            setError("Invalid OTP code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                <div className="bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] p-6 text-center text-white relative">
                    <button onClick={onCancel} className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30"><ShieldCheck size={32} /></div>
                    <h3 className="text-xl font-bold">Verification</h3>
                    <p className="text-xs text-white/80 mt-1">Applying for: {offerTitle}</p>
                </div>
                <div className="p-6">
                    {step === "details" ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="text" placeholder="Full Name" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="email" placeholder="Email Address" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="tel" maxLength={10} placeholder="10-digit Mobile Number" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })} />
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                            <button type="submit" disabled={isLoading} className="w-full bg-[#1CADA3] text-white py-3.5 rounded-xl font-bold hover:bg-[#178e86] shadow-lg disabled:opacity-50 transition-all active:scale-95">{isLoading ? "Requesting OTP..." : "Continue to Verification"}</button>
                        </form>
                    ) : (
                        <div className="space-y-6 text-center animate-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <p className="text-sm text-gray-500 mb-6">Enter the code sent to <br /> <span className="text-gray-800 font-medium tracking-wide">{formData.mobile}</span></p>
                                <div className="flex justify-between gap-2 mb-2">
                                    {otp.map((digit, index) => (
                                        <input key={index} type="text" maxLength={1} ref={(el) => { inputRefs.current[index] = el; }} value={digit} onChange={(e) => handleOtpChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-14 border-2 border-gray-100 rounded-xl text-center text-2xl font-medium text-gray-700 focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none transition-all" />
                                    ))}
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                            <div className="space-y-3">
                                <button onClick={handleVerifyOtp} disabled={isLoading} className="w-full bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white py-3.5 rounded-xl font-bold shadow-lg">{isLoading ? "Verifying..." : "Verify & Open Application"}</button>
                                <div className="flex flex-col gap-2 pt-2">
                                    {timer > 0 ? <p className="text-xs text-red-400 font-medium">Resend OTP in {timer}s</p> : <button onClick={() => handleSendOtp()} className="text-xs text-[#1CADA3] hover:text-[#178e86] font-bold underline">Resend OTP</button>}
                                    <button onClick={() => setStep("details")} className="text-xs text-gray-400 hover:text-gray-600 underline">Change details</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
