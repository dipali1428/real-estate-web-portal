"use client";

import React, { useState, useEffect, useRef } from "react";
import { PublicService } from "../../services/publicService";

// Temporary Mock Response based on your actual API structure
// const MOCK_RESPONSE = {
//     "status": {
//         "code": 200,
//         "type": "success",
//         "message": "Request processed successfully."
//     },
//     "message": "Request processed successfully.",
//     "cibil_score": "750", // Directly added for easier access
//     "data": {
//         "request_id": 18,
//         "customer_id": 987654321,
//     },
//     "cibilPayload": {
//         "data": {
//             "GetCustomerAssetsResponse": {
//                 "ResponseStatus": "Success",
//                 "ResponseKey": "XXXXXXXXXXXXXXXXXX",
//                 "GetCustomerAssetsSuccess": {
//                     "Asset": {
//                         "Status": "Active",
//                         "SafetyCheckFailure": false,
//                         "ExpirationDate": "2028-01-16T11:10:14.833+05:30",
//                         "CreationDate": "2026-01-16T11:10:14.833+05:30",
//                         "TrueLinkCreditReport": {
//                             "ReferenceKey": "XXXXXXXXXX",
//                             "currentversion": "5.0",
//                             "Borrower": {
//                                 "CreditScore": {
//                                     "riskScore": "764",
//                                     "scoreName": "CIBILTransUnionScore3"
//                                 }
//                             },
//                             "TradeLinePartition": [
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "HDFC BANK",
//                                         "currentBalance": "175419",
//                                         "GrantedTrade": { "amountPastDue": "0" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "HDFC BANK",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "0" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "MANAPPURAM",
//                                         "dateClosed": "2019-04-30+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "0" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "SBI",
//                                         "dateClosed": "2022-04-28+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "-1" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "SBI",
//                                         "dateClosed": "2016-11-30+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "-1" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "BAJAJ FIN LTD",
//                                         "dateClosed": "2021-05-21+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "0" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "SBI",
//                                         "dateClosed": "2011-02-27+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "-1" }
//                                     }
//                                 },
//                                 {
//                                     "Tradeline": {
//                                         "creditorName": "SBI",
//                                         "dateClosed": "2008-02-19+05:30",
//                                         "currentBalance": "0",
//                                         "GrantedTrade": { "amountPastDue": "-1" }
//                                     }
//                                 }
//                             ]
//                         }
//                     }
//                 }
//             }
//         }
//     }
// };

const CreditScorePage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "", // Updated from name
        email: "",
        mobile: "", // Default verified mobile
        pan: "",
        gender: "",
        dob: "",
        consent: false,
    });

    const [showTerms, setShowTerms] = useState(false);

    const [isMobileVerified, setIsMobileVerified] = useState(false); // Changed to false to show popup immediately
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Changed to array for 6 boxes
    const [otpLoading, setOtpLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    const [activeFaq, setactiveFaq] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [cibilResult, setCibilResult] = useState<string | null>(null);
    const [scoreValue, setScoreValue] = useState<string | null>(null); // New state for dedicated card
    const [showCongrats, setShowCongrats] = useState(false); // New state for congrats popup
    const [error, setError] = useState<string | null>(null);

    // New state for dynamic report values
    const [reportSummary, setReportSummary] = useState({
        activeLoans: "0",
        controlNumber: "10397635617",
        outstanding: "₹0.00",
        overdue: "₹0.00",
        lastChecked: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    const [id, setId] = useState<string | null>(null); // State for report ID
    const [isDownloading, setIsDownloading] = useState(false); // Loading state for download button

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Auto-hide congrats popup after 2.5 seconds (Reduced from 4s)
    useEffect(() => {
        if (showCongrats) {
            const timer = setTimeout(() => setShowCongrats(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [showCongrats]);

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next box if value is entered
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };
    const [isDismissed, setIsDismissed] = React.useState(false);
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (e.target.type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
            return;
        }

        let newValue = value;

        if (name === "fullName") { // Updated logic for fullName
            newValue = newValue.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        }
        if (name === "email") {
            newValue = newValue.trim().toLowerCase();
        }
        if (name === "mobile") {
            newValue = newValue.replace(/\D/g, "");
            if (newValue.length > 10) return;
        }
        if (name === "pan") {
            newValue = newValue.toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (newValue.length > 10) return;
        }

        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSendOtp = async () => {
        if (otpLoading) return;
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        setError(null);
        setOtpLoading(true);
        try {
            // API Commented - Mocking response
            const response = await PublicService.sendOtp({ mobile: formData.mobile });

            // const response = true;
            if (response) {
                setOtpSent(true);
                setOtp(["", "", "", "", "", ""]);
                setTimer(30);
                setError(null);
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to send OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otpLoading) return;
        const fullOtp = otp.join("");
        if (fullOtp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        setError(null);
        setOtpLoading(true);
        try {
            // API Commented - Mocking response

            const response = await PublicService.verifyOtp({
                mobile: formData.mobile,
                otp: fullOtp
            });

            // const response = true;
            if (response) {
                setIsMobileVerified(true);
                setOtpSent(false);
                setError(null);
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Invalid OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!nameRegex.test(formData.fullName)) {
            setError("Please enter your full name (First & Last name).");
            return;
        }
        if (!panRegex.test(formData.pan.toUpperCase())) {
            setError("Enter a valid PAN number.");
            return;
        }
        if (!formData.gender) {
            setError("Please select your gender.");
            return;
        }
        if (!formData.dob) {
            setError("Please enter your date of birth.");
            return;
        }

        setLoading(true);
        setError(null);

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            pan: formData.pan,
            gender: formData.gender.toLowerCase(),
            dob: formData.dob
        };

        try {
            const response = await PublicService.checkCibilScore(payload);
            // const response = MOCK_RESPONSE;
            if (response.data && response.data.request_id) {
                setId(response.data.request_id.toString());
            }
            // --- NEW MAPPING LOGIC START ---
            // Accessing cibilPayload based on your provided server response
            const cibilData = response.cibilPayload.data;
            const assetSuccess = cibilData.GetCustomerAssetsResponse.GetCustomerAssetsSuccess;
            const asset = assetSuccess.Asset;
            const report = asset.TrueLinkCreditReport;
            const tradeLines = report.TradeLinePartition || [];

            // Capture the ResponseKey for downloading
            // setId(cibilData.GetCustomerAssetsResponse.ResponseKey);

            // Calculate active loans (those without a dateClosed)
            const activeLoansCount = tradeLines.filter((tl: any) => !tl.Tradeline.dateClosed).length;

            // Calculate Total Outstanding
            const totalOutstanding = tradeLines.reduce((sum: number, tl: any) => {
                const bal = parseInt(tl.Tradeline.currentBalance);
                return sum + (bal > 0 ? bal : 0);
            }, 0);

            // Calculate Total Overdue (Treating -1 as 0)
            const totalOverdue = tradeLines.reduce((sum: number, tl: any) => {
                const overdue = parseInt(tl.Tradeline.GrantedTrade?.amountPastDue || "0");
                return sum + (overdue > 0 ? overdue : 0);
            }, 0);

            // Get score (using the direct field from your API)
            const score = response.cibil_score || report.Borrower.CreditScore.riskScore;

            // Format dynamic date from CreationDate
            // Format dynamic date using the current time
            const formattedDate = new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            setScoreValue(score);
            setReportSummary({
                activeLoans: activeLoansCount.toString(),
                controlNumber: report.ReferenceKey || "N/A", // Using ReferenceKey from API
                outstanding: `₹${totalOutstanding.toLocaleString('en-IN')}.00`,
                overdue: `₹${totalOverdue.toLocaleString('en-IN')}.00`,
                lastChecked: formattedDate
            });

            if (parseInt(score) > 750) {
                setShowCongrats(true);
            }
            setCibilResult(`Success! Your CIBIL Score is: ${score}`);
            // --- NEW MAPPING LOGIC END ---

        } catch (err: any) {
            console.error("API Error:", err);
            setError(err?.response?.data?.message || "Something went wrong while retrieving your score.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = async () => {
        if (!id) return;
        setIsDownloading(true);
        try {
            const blob = await PublicService.downloadCibilReport(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `cibil-report-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Error downloading report:", err);
            setError("Failed to download the report. Please try again later.");
        } finally {
            setIsDownloading(false);
        }
    };

    const getCreditHealth = (score: string | null) => {
        const s = parseInt(score || "0");
        if (s >= 750) return { label: "EXCELLENT CREDIT HEALTH", color: "text-[#1CADA3]", bg: "bg-[#E6FFFA]" };
        if (s >= 700) return { label: "GOOD CREDIT HEALTH", color: "text-emerald-600", bg: "bg-emerald-50" };
        if (s >= 650) return { label: "AVERAGE CREDIT HEALTH", color: "text-orange-600", bg: "bg-orange-50" };
        return { label: "POOR CREDIT HEALTH", color: "text-red-600", bg: "bg-red-50" };
    };

    const toggleFaq = (index: number) => setactiveFaq(activeFaq === index ? null : index);
    const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <div className="bg-white min-h-screen text-gray-600">
            <style>{`
                @keyframes confetti-blast {
                    0% { transform: translateY(0) rotate(0); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: #1CADA3;
                    top: -10px;
                    z-index: 50;
                    animation: confetti-blast 2.5s ease-out forwards;
                }
                @keyframes gauge-sweep {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(var(--target-deg)); }
                }
                .gauge-arrow-animated {
                    transform-origin: 50px 50px;
                    animation: gauge-sweep 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .gauge-path {
                    transition: stroke-dashoffset 2.5s ease-out;
                }
            `}</style>

            {/* Congratulations Popup Overlay */}
            {showCongrats && (
                <div className="fixed inset-0 z-1100 flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-white border-2 border-[#1CADA3] p-8 rounded-3xl shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500 text-center">
                        <span className="text-5xl block mb-4">🎉</span>
                        <h3 className="text-2xl font-bold text-gray-800">Congratulations!</h3>
                        <p className="text-[#1CADA3] text-xl font-bold">You have a great score!</p>
                    </div>
                </div>
            )}

            {/* MOBILE VERIFICATION POPUP - Added !isDismissed check */}
            {!isMobileVerified && !isDismissed && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-gray-600">
                    {/* Added 'relative' to this div to position the close button */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in duration-300 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center mb-6">
                            <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Powered by</span>
                            <img src="/cibil-logo.svg" alt="Logo" className="h-8" />
                        </div>
                        <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">Verify Mobile</h4>
                        <p className="text-center text-gray-500 mb-8">We'll send a 6-digit code to verify your identity.</p>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-gray-400 font-semibold border-r border-gray-300 pr-3">+91</span>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleFormChange}
                                        disabled={otpSent || otpLoading}
                                        className="w-full pl-[4.5rem] pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1CADA3] outline-none font-bold text-lg"
                                        placeholder="0000000000"
                                    />
                                </div>
                            </div>

                            {!otpSent ? (
                                <button
                                    onClick={handleSendOtp}
                                    disabled={otpLoading || formData.mobile.length < 10}
                                    className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50"
                                >
                                    {otpLoading ? "Sending..." : "Get OTP"}
                                </button>
                            ) : (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Code</label>
                                        <div className="flex justify-between gap-2">
                                            {otp.map((digit, idx) => (
                                                <input
                                                    key={idx}
                                                    ref={(el) => { otpRefs.current[idx] = el; }}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                    className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-[#1CADA3] focus:ring-0 outline-none"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleVerifyOtp}
                                        disabled={otpLoading || otp.join("").length < 6}
                                        className="w-full bg-[#1CADA3] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50"
                                    >
                                        {otpLoading ? "Verifying..." : "Verify OTP"}
                                    </button>
                                    <div className="text-center space-y-3">
                                        {timer > 0 ? (
                                            <p className="text-sm text-gray-500 font-medium">
                                                Resend OTP in <span className="text-[#1CADA3]">{timer}s</span>
                                            </p>
                                        ) : (
                                            <button
                                                onClick={handleSendOtp}
                                                className="text-sm text-[#1CADA3] font-bold hover:underline decoration-2 underline-offset-4"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <button onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]) }} className="text-sm text-gray-400 font-medium hover:text-[#2076C7]">Change Number</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {error && <p className="mt-4 text-center text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                    </div>
                </div>
            )}
            <section className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white py-20">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Free CIBIL Score Check</h1>
                        <p className="text-lg mb-6 opacity-90">Securely verify your identity and get your credit report in seconds.</p>
                        <button onClick={() => scrollToSection("check-now")} className="bg-white text-[#1CADA3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Get Started Now ↓
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 text-gray-700">
                <section id="check-now" className="max-w-6xl mx-auto relative">
                    {/* Celebration Blast if score > 750 (Stops after 2.5s) */}
                    {scoreValue && parseInt(scoreValue) > 750 && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
                            {[...Array(25)].map((_, i) => (
                                <div
                                    key={i}
                                    className="confetti"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 1.5}s`,
                                        backgroundColor: ["#1CADA3", "#F59E0B", "#EF4444", "#2076C7"][i % 4]
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {scoreValue ? (
                        /* REDESIGNED REPORT CARD */
                        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] animate-in zoom-in duration-500 relative">
                            {/* LEFT SIDE: GAUGE */}
                            <div className="w-full md:w-5/12 p-12 flex flex-col items-center justify-center border-r border-gray-100">
                                <div className="relative w-72 h-72">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <defs>
                                            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#EF4444" />
                                                <stop offset="50%" stopColor="#F59E0B" />
                                                <stop offset="100%" stopColor="#1CADA3" />
                                            </linearGradient>
                                        </defs>
                                        {/* Background Path (Arch) */}
                                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                                        {/* Progress Path (Arch) */}
                                        <path
                                            d="M 10 50 A 40 40 0 0 1 90 50"
                                            fill="none"
                                            stroke="url(#gauge-grad)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="125.66"
                                            strokeDashoffset={125.66 - (Math.min(Math.max((parseInt(scoreValue) - 299) / 600, 0), 1) * 125.66)}
                                            className="gauge-path"
                                        />

                                        {/* GAUGE ARROW ANIMATED - LEFT TO RIGHT EVERY TIME */}
                                        <g className="gauge-arrow-animated" style={{ "--target-deg": `${Math.min(Math.max((parseInt(scoreValue) - 300) / 600, 0), 1) * 180}deg` } as React.CSSProperties}>
                                            <line x1="50" y1="50" x2="20" y2="50" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
                                            <polygon points="15,50 23,47 23,53" fill="#2D3748" />
                                        </g>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-20">
                                        <span className="text-5xl font-black text-gray-800">{scoreValue}</span>
                                        <span className="text-gray-400 font-bold tracking-widest text-[10px]">CIBIL SCORE</span>
                                    </div>
                                    <div className="absolute bottom-16 w-full flex justify-between px-10 text-[10px] font-bold text-gray-400"><span>300</span><span>900</span></div>
                                    <div className="absolute top-5 right-5 w-8 h-8 bg-[#1CADA3] rounded-full flex items-center justify-center text-white shadow-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                                </div>
                                {/* Replace the old static div with this dynamic one */}
                                <div className={`mt-4 ${getCreditHealth(scoreValue).bg} ${getCreditHealth(scoreValue).color} px-6 py-2 rounded-full flex items-center gap-2 font-bold text-xs`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {getCreditHealth(scoreValue).label}
                                </div>
                                {/* <p className="text-gray-500 mt-6 text-center text-sm">Your score is in the top 15%<br />of all consumers.</p> */}
                            </div>

                            {/* RIGHT SIDE: SUMMARY */}
                            <div className="w-full md:w-7/12 p-12 relative flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-10">
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">Your CIBIL Score summary</h2>
                                            <p className="text-gray-400 text-xs mt-1">Key factors impacting your credit health</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleDownloadReport}
                                                disabled={isDownloading}
                                                className="bg-[#1CADA3] text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-sm shadow-xl hover:opacity-90 transition disabled:opacity-50"
                                            >
                                                {isDownloading ? "Downloading..." : "Download Report"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { l: "ACTIVE LOAN ACCOUNTS", v: reportSummary.activeLoans },
                                            { l: "CIBIL CONTROL NUMBER", v: reportSummary.controlNumber },
                                            { l: "CURRENT OUTSTANDING", v: reportSummary.outstanding },
                                            { l: "AMOUNT OVERDUE", v: reportSummary.overdue }
                                        ].map((c, i) => (
                                            <div key={i} className="bg-[#F8FAFC] p-6 rounded-3xl border border-gray-50 flex flex-col justify-between h-28">
                                                <span className="text-[9px] font-black text-gray-400 tracking-wider uppercase">{c.l}</span>
                                                <span className="text-xl font-bold text-gray-800">{c.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end">
                                    <div><p className="text-[9px] font-bold text-gray-400 uppercase">Checked Date</p><p className="font-bold text-gray-700 text-sm">{reportSummary.lastChecked}</p></div>
                                    <div className="text-left">
                                        <span className="text-[9px] font-bold text-gray-300 uppercase block mb-1">Powered by</span>
                                        <img src="/cibil-logo.svg" alt="CIBIL" className="h-10 ml-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden text-gray-600">
                            {/* SVG Logo from public folder at Top Left */}
                            <div className="absolute top-6 left-8">
                                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 tracking-wider">Powered by</span>
                                <img src="/cibil-logo.svg" alt="Logo" className="h-8 md:h-10 opacity-80" />
                            </div>

                            <h4 className="text-2xl font-bold text-center text-gray-800 mb-8 mt-12 md:mt-0">Complete Your Details</h4>

                            {isMobileVerified ? (
                                <form onSubmit={handleFormSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-emerald-500 text-white p-2.5 rounded-full">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider">Mobile Verified</p>
                                                <p className="text-lg font-semibold text-gray-700">+91 {formData.mobile}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (As per PAN) *</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} required placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CADA3] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CADA3] outline-none" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
                                            <input type="text" name="pan" value={formData.pan} onChange={handleFormChange} maxLength={10} required placeholder="ABCDE1234F" className="w-full px-4 py-3 border border-gray-300 rounded-lg uppercase focus:ring-2 focus:ring-[#1CADA3] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CADA3] outline-none bg-white"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CADA3] outline-none"
                                            />
                                        </div>
                                    </div>

                                    <p className="mb-6 text-[14px] text-gray-700 leading-relaxed italic border-l-2 border-[#1CADA3]/30 pl-3 bg-green-50 rounded-1xl">
                                        Disclaimer: Checking your CIBIL score through this platform is a soft inquiry and will not affect or reduce your CIBIL score in any way.
                                    </p>

                                    <div className="mb-6">
                                        <div className="flex items-start">
                                            <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleFormChange} required className="mt-1 mr-3 w-4 h-4 text-[#1CADA3] border-gray-300 rounded" />
                                            <label htmlFor="consent" className="text-sm text-gray-600">
                                                I authorize fetching my CIBIL score and agree to the{" "}
                                                <span
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowTerms(true);
                                                    }}
                                                    className="text-[#1CADA3] hover:underline cursor-pointer font-medium"
                                                >
                                                    Terms & Conditions
                                                </span>.
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-xl font-bold text-lg shadow-lg transition disabled:opacity-50">
                                        {loading ? "Processing..." : "Get My Free CIBIL Score"}
                                    </button>
                                </form>
                            ) : (
                                /* THIS SECTION APPEARS IF MOBILE IS NOT VERIFIED */
                                <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in duration-500">
                                    <div className="bg-gray-50 p-6 rounded-full mb-6">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h5 className="text-xl font-bold text-gray-800 mb-2">Verification Required</h5>
                                    <p className="text-gray-500 mb-8 max-w-xs">To secure your data, please verify your mobile number to unlock the form.</p>
                                    <button
                                        onClick={() => setIsDismissed(false)}
                                        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
                                    >
                                        Verify Mobile Now
                                    </button>
                                </div>
                            )}

                            {error && <p className="mt-4 text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg">{error}</p>}
                        </div>
                    )}
                </section>
            </div>
            {/* TERMS AND CONDITIONS MODAL */}
            {showTerms && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in zoom-in duration-300 overflow-hidden">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Terms and Conditions</h3>
                                <p className="text-xs text-gray-500 font-medium mt-1">Last updated February 27, 2026</p>
                            </div>
                            <button
                                onClick={() => setShowTerms(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content (Scrollable) */}
                        <div className="p-8 md:p-12 overflow-y-auto text-sm leading-relaxed text-gray-700 space-y-8 bg-gray-50/30">

                            {/* 1. Agreement */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">AGREEMENT TO OUR LEGAL TERMS</h4>
                                <p className="mb-4">
                                    We are <strong>Infinity Arthvishva</strong> ("Company," "we," "us," "our"), a company registered in India at 1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016.
                                </p>
                                <p className="mb-4">
                                    We operate the website <a href="https://www.infinityarthvishva.com" className="text-[#1CADA3] underline">https://www.infinityarthvishva.com</a>, as well as any other related products and services that refer or link to these legal terms (the "Legal Terms").
                                </p>
                                <div className="bg-white p-5 border-l-4 border-[#1CADA3] shadow-sm italic text-gray-600">
                                    These Legal Terms constitute a legally binding agreement. By accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE, YOU MUST DISCONTINUE USE IMMEDIATELY.
                                </div>
                            </section>

                            {/* 2. Services */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">1. OUR SERVICES</h4>
                                <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation.</p>
                            </section>

                            {/* 3. IP Rights */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">2. INTELLECTUAL PROPERTY RIGHTS</h4>
                                <p className="font-bold mb-2">Our intellectual property</p>
                                <p className="mb-4">We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, text, photographs, and graphics.</p>
                            </section>

                            {/* 4. Prohibited Activities */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">5. PROHIBITED ACTIVITIES</h4>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li>Systematically retrieve data to create or compile a database without written permission.</li>
                                    <li>Trick, defraud, or mislead us and other users.</li>
                                    <li>Circumvent, disable, or otherwise interfere with security-related features.</li>
                                    <li>Engage in unauthorized framing of or linking to the Services.</li>
                                    <li>Upload or transmit viruses, Trojan horses, or other disruptive material.</li>
                                </ul>
                            </section>

                            {/* 5. Governing Law */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">11. GOVERNING LAW</h4>
                                <p>These Legal Terms shall be governed by and defined following the laws of India. Infinity Arthvishva and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute.</p>
                            </section>

                            {/* 6. Disclaimer */}
                            <section>
                                <h4 className="text-lg font-bold text-red-700 mb-4 uppercase">14. DISCLAIMER</h4>
                                <div className="font-bold uppercase space-y-4 text-xs text-gray-600">
                                    <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK.</p>
                                    <p>WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS.</p>
                                </div>
                            </section>

                            {/* 7. Liability */}
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">15. LIMITATIONS OF LIABILITY</h4>
                                <p className="text-xs font-bold uppercase text-gray-600">
                                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
                                </p>
                            </section>

                            {/* 8. Contact */}
                            <section className="bg-gray-100 p-6 rounded-2xl">
                                <h4 className="font-bold text-gray-900 mb-2">CONTACT US</h4>
                                <p>Infinity Arthvishva</p>
                                <p>1001 & 1201, 7 Business Square by Naiknavare, Shivajinagar, Pune 411016</p>
                                <p>Phone: 1800-532-7600</p>
                                <p>Email: <span className="text-[#1CADA3]">info@infinityarthvishva.com</span></p>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white text-center">
                            <button
                                onClick={() => setShowTerms(false)}
                                className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-95"
                            >
                                I Accept & Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreditScorePage;