"use client";

import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { AuthService } from "@/app/services/authService";
import { useModal } from "../../context/ModalContext";
import { Eye, EyeOff } from "lucide-react";

// --- Regex rules ---
const NAME_REGEX = /^[A-Za-z ]{2,60}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const CATEGORY_MAP: Record<string, string[]> = {
    Investment: [
        "Mutual Funds",
        "Wealth Management",
        "Pension Funds",
        "Stocks and Securities",
        "Portfolio Management Services",
        "Real Estate Investments",
        "Unlisted Shares",
    ],
    Protection: [
        "Life Insurance",
        "Health Insurance",
        "Motor Insurance",
        "Travel Insurance",
        "Corporate General Insurance",
    ],
    Finance: [
        "Home Finance",
        "Personal Finance",
        "SME Finance",
        "EMI Solution",
        "Loan Against Securities",
        "Corporate Finance",
        "Mortgage Finance",
        "Debt Capital Market & Loan Syndication",
        "Asset Reconstruction",
        "Tax Consultancy",
        "Education Loan",
        "Business Loan",
    ],
};

// Simple math CAPTCHA
function useMathCaptcha() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [answer, setAnswer] = useState("");

    const refresh = () => {
        setA(Math.floor(Math.random() * 8) + 2);
        setB(Math.floor(Math.random() * 8) + 2);
        setAnswer("");
    };

    useEffect(() => {
        refresh();
    }, []);

    const isValid = useMemo(() => String(a + b) === answer.trim(), [a, b, answer]);
    return { a, b, answer, setAnswer, refresh, isValid };
}

export default function BecomePartnerForm() {
    const { openLogin, closeAll } = useModal();
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        pan: "",
        city: "",
        head: "",
        category: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<{ level: string; }>({ level: "" });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<{ adv_id: string; email: string; mobile: string; message: string } | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const { a, b, answer, setAnswer, refresh, isValid } = useMathCaptcha();

    const categories = useMemo(() => CATEGORY_MAP[form.head] ?? [], [form.head]);

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return { level: "Weak" };
        if (strength === 3) return { level: "Medium" };
        return { level: "Strong" };
    };

    useEffect(() => {
        // Keep only categories that belong to one of the currently selected heads
        const selectedHeads = form.head
            ? form.head.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

        const allowedCategories = selectedHeads.flatMap((h) => CATEGORY_MAP[h] || []);

        setForm((f) => {
            const currentCats = f.category
                ? f.category.split(",").map((s) => s.trim()).filter(Boolean)
                : [];
            const pruned = currentCats.filter((c) => allowedCategories.includes(c));
            // Only update if something actually changed to avoid extra re-renders
            const next = pruned.join(",");
            return next === f.category ? f : { ...f, category: next };
        });
    }, [form.head]);

    useEffect(() => {
        if (success) {
            const t = setTimeout(() => {
                closeAll();     // 👈 closes registration modal COMPLETELY
                openLogin();    // 👈 open login modal cleanly
            }, 2000);
            return () => clearTimeout(t);
        }
    }, [success, closeAll, openLogin]);



    const setField = (key: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!NAME_REGEX.test(form.name)) e.name = "Enter a valid name.";
        if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email.";
        if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile.";
        if (!PAN_REGEX.test(form.pan)) e.pan = "Enter a valid PAN (AAAAA9999A).";
        if (!form.city || form.city.trim().length < 2) e.city = "Enter a valid city.";
        if (!form.head) e.head = "Choose head category.";
        if (!form.category) e.category = "Choose category.";
        if (form.password.length < 8) e.password = "Min 8 characters required.";
        if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
        if (!form.agree) e.agree = "You must agree.";
        if (!isValid) e.captcha = "Captcha incorrect.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setSuccess(null);
        setServerError(null);

        if (!validate()) return;
        setSubmitting(true);

        try {
            const data = await AuthService.register({
                name: form.name,
                email: form.email,
                mobile: form.mobile,
                pan: form.pan,
                city: form.city,
                head: form.head,
                category: form.category,
                password: form.password,
                confirm_password: form.confirmPassword,
            });

            setSuccess(data?.user ? {
                adv_id: data.user.adv_id,
                email: data.user.email,
                mobile: data.user.mobile,
                message: data.message
            } : null);

            setForm({
                name: "",
                email: "",
                mobile: "",
                pan: "",
                city: "",
                head: "",
                category: "",
                password: "",
                confirmPassword: "",
                agree: false,
            });
            refresh();
            setAnswer("");
        } catch (err: any) {
            setServerError(err?.response?.data?.message || "Something went wrong. Try again.");
            refresh();
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-gray-300 focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30 px-3 py-2.5 text-sm bg-white text-gray-800 placeholder:text-gray-500 outline-none transition";

    const labelClass = "text-sm font-medium text-gray-700";
    const errorClass = "text-xs text-red-600 mt-1";

    return (
        <main className="container mx-auto px-2 py-4">
            <h1 className="text-2xl font-bold text-center mb-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Become a Partner</h1>
            <p className="text-gray-500 text-center mt-2 mb-2">Register to access your dashboard.</p>
            <form
                onSubmit={onSubmit}
                className="bg-linear-to-br from-[#E8F6FA] via-[#F9FCFC] to-[#E9F8F6] 
             p-5 md:p-8 rounded-2xl border border-[#1CADA3]/20 shadow-lg 
             w-full max-w-4xl mx-auto overflow-y-auto 
             max-h-[88vh] md:max-h-[82vh] scrollbar-thin scrollbar-thumb-[#B4E3DD] scrollbar-track-transparent hover:scrollbar-thumb-[#1CADA3]/40 transition-all duration-300">
                {!success ? (
                    <>
                        {/* --- ALL your existing input fields, captcha, and buttons go here --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className={labelClass}>Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setField("name", e.target.value)}
                                    className={inputClass}
                                    placeholder="Full name"
                                />
                                {errors.name && <p className={errorClass}>{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                    className={inputClass}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className={errorClass}>{errors.email}</p>}
                            </div>

                            {/* Mobile */}
                            <div>
                                <label className={labelClass}>Mobile</label>
                                <input
                                    type="tel"
                                    value={form.mobile}
                                    onChange={(e) =>
                                        setField("mobile", e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                                    }
                                    className={inputClass}
                                    placeholder="9876543210"
                                />
                                {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
                            </div>

                            {/* PAN */}
                            <div>
                                <label className={labelClass}>PAN Number</label>
                                <input
                                    type="text"
                                    value={form.pan}
                                    onChange={(e) => setField("pan", e.target.value.toUpperCase())}
                                    className={inputClass}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                />
                                {errors.pan && <p className={errorClass}>{errors.pan}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className={labelClass}>City</label>
                                <input
                                    type="text"
                                    value={form.city}
                                    onChange={(e) => setField("city", e.target.value)}
                                    className={inputClass}
                                    placeholder="Mumbai"
                                />
                                {errors.city && <p className={errorClass}>{errors.city}</p>}
                            </div>

                            {/* Head & Category Selection (Fixed Multi-Select) */}
                            <div className="md:col-span-2">
                                <label className={labelClass}>Select Head Categories & Subcategories</label>

                                <div className="border border-gray-200 rounded-xl p-4 bg-white/80 shadow-md 
                                    hover:shadow-lg transition-all duration-300 
                                    max-h-[280px] md:max-h-80 overflow-y-auto 
                                    scrollbar-thin scrollbar-thumb-[#B4E3DD] scrollbar-track-transparent hover:scrollbar-thumb-[#1CADA3]/40">
                                    {Object.entries(CATEGORY_MAP).map(([head, subs]) => {
                                        const selectedHeads = form.head ? form.head.split(",") : [];
                                        const selectedCats = form.category ? form.category.split(",") : [];
                                        const isHeadSelected = selectedHeads.includes(head);

                                        // ✅ Toggle head without clearing other head selections or their subcategories
                                        const toggleHead = (checked: boolean) => {
                                            const selectedHeads = form.head ? form.head.split(",").map(s => s.trim()).filter(Boolean) : [];
                                            const selectedCats = form.category ? form.category.split(",").map(s => s.trim()).filter(Boolean) : [];
                                            const subs = CATEGORY_MAP[head] || [];

                                            let newHeads = [...selectedHeads];
                                            if (checked) {
                                                if (!newHeads.includes(head)) newHeads.push(head);
                                            } else {
                                                newHeads = newHeads.filter((h) => h !== head);
                                                // remove only this head's categories
                                                const remainingCats = selectedCats.filter((c) => !subs.includes(c));
                                                setField("category", remainingCats.join(","));
                                            }

                                            setField("head", newHeads.join(","));
                                        };


                                        // ✅ Toggle a subcategory (keep all others)
                                        const toggleSub = (cat: string, checked: boolean) => {
                                            let newCats = [...selectedCats];
                                            if (checked) {
                                                if (!newCats.includes(cat)) newCats.push(cat);
                                            } else {
                                                newCats = newCats.filter((c) => c !== cat);
                                            }
                                            setField("category", newCats.join(","));
                                        };

                                        return (
                                            <div key={head} className="mb-3">
                                                {/* Head checkbox */}
                                                <label className="flex items-center gap-2 font-medium text-gray-800 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isHeadSelected}
                                                        onChange={(e) => toggleHead(e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]"
                                                    />
                                                    {head}
                                                </label>

                                                {/* Subcategories (only visible if head selected) */}
                                                {isHeadSelected && (
                                                    <div className="ml-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                                        {subs.map((cat) => (
                                                            <label key={cat} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedCats.includes(cat)}
                                                                    onChange={(e) => toggleSub(cat, e.target.checked)}
                                                                    className="h-3.5 w-3.5 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]"
                                                                />
                                                                {cat}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {errors.head && <p className={errorClass}>{errors.head}</p>}
                                {errors.category && <p className={errorClass}>{errors.category}</p>}
                                <p className="text-xs text-gray-500 mt-1">
                                    You can select multiple heads and subcategories — all selected values will be saved.
                                </p>
                            </div>

                            {/* Password */}
                            <div>
                                <label className={labelClass}>Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setField("password", value);
                                            setPasswordStrength(checkPasswordStrength(value));
                                        }}
                                        className={`${inputClass} pr-10`}
                                        placeholder="Minimum 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {form.password && (
                                    <div className="mt-1 flex items-center gap-2 text-xs">
                                        {/* colored bar */}
                                        <div
                                            className={`h-1.5 w-16 rounded-full transition-all ${passwordStrength.level === "Weak"
                                                ? "bg-red-500"
                                                : passwordStrength.level === "Medium"
                                                    ? "bg-orange-500"
                                                    : passwordStrength.level === "Strong"
                                                        ? "bg-green-500"
                                                        : "bg-gray-300"
                                                }`}
                                        ></div>

                                        {/* label text */}
                                        <span
                                            className={`font-medium ${passwordStrength.level === "Weak"
                                                ? "text-red-600"
                                                : passwordStrength.level === "Medium"
                                                    ? "text-orange-600"
                                                    : passwordStrength.level === "Strong"
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                                }`}>
                                            {passwordStrength.level}
                                        </span>
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-1">
                                    Use at least 8 characters, including one uppercase, one lowercase, one number, and one special symbol.
                                </p>
                                {errors.password && <p className={errorClass}>{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className={labelClass}>Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={form.confirmPassword}
                                        onChange={(e) => setField("confirmPassword", e.target.value)}
                                        className={`${inputClass} pr-10`}
                                        placeholder="Re-enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((p) => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                                        {/* {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
                            </div>

                            {/* Captcha */}
                            <div className="md:col-span-2">
                                <label className={labelClass}>Captcha</label>
                                <div className="flex items-center gap-3">
                                    <div className="select-none rounded-lg border border-dashed border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700">
                                        What is <b>{a}</b> + <b>{b}</b>?
                                    </div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
                                        className={`${inputClass} max-w-[100px]`}
                                        placeholder="Ans"
                                    />
                                    <button
                                        type="button"
                                        onClick={refresh}
                                        className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 cursor-pointer">
                                        Refresh
                                    </button>
                                </div>
                                {errors.captcha && <p className={errorClass}>{errors.captcha}</p>}
                            </div>

                            {/* Agree */}
                            <div className="md:col-span-2">
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={form.agree}
                                        onChange={(e) => setField("agree", e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]"
                                    />
                                    I agree to the{" "}
                                    <a href="#" className="underline" onClick={(e) => e.preventDefault()}>
                                        Terms
                                    </a>{" "}
                                    &{" "}
                                    <a href="#" className="underline" onClick={(e) => e.preventDefault()}>
                                        Privacy Policy
                                    </a>
                                    .
                                </label>
                                {errors.agree && <p className={errorClass}>{errors.agree}</p>}
                            </div>

                        </div>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold text-[#1CADA3] mb-4">Registration Successful 🎉</h2>
                        <div className="inline-block bg-white shadow-md rounded-xl p-6 border border-[#1CADA3]/20 text-left">
                            <p className="text-gray-700 mb-2"><b>Advisor ID:</b> {success.adv_id}</p>
                            <p className="text-gray-700 mb-2"><b>Email:</b> {success.email}</p>
                            <p className="text-gray-700 mb-2"><b>Mobile:</b> {success.mobile}</p>
                        </div>
                        <p className="mt-5 text-sm text-gray-600">
                            {success.message}
                            You can login using your registered email and password.
                        </p>
                    </div>
                )}
                {/* Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-2.5 rounded-lg shadow hover:shadow-md disabled:opacity-60 text-sm">
                        {submitting ? "Submitting..." : "Create Account"}
                    </button>
                    <button
                        type="button"
                        onClick={(openLogin)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700  cursor-pointer">
                        Login
                    </button>
                </div>

                {serverError && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
                        {serverError}
                    </div>
                )}
            </form>
        </main>

    );
}
