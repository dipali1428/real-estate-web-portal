"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthService } from "@/app/services/authService";
import { useModal } from "../../context/ModalContext";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { STATES_CITIES } from "@/app/data/statesCities";

const states = Object.keys(STATES_CITIES);

// --- Regex rules ---
const NAME_REGEX = /^[A-Za-z ]{2,60}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

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

export default function CustomerRegistrationForm() {
  const { openLogin, closeAll } = useModal();

  // --- Form State ---
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const cities = useMemo(() => {
    return form.state ? STATES_CITIES[form.state] || [] : [];
  }, [form.state]);

  // --- UI State ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{ level: string }>({ level: "" });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ email: string; mobile: string; message: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { a, b, answer, setAnswer, refresh, isValid } = useMathCaptcha();

  // --- Helpers ---
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 3) return { level: "Weak" };
    if (strength === 4) return { level: "Medium" };
    return { level: "Strong" };
  };

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        closeAll();
        openLogin();
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [success, closeAll, openLogin]);

  const setField = (key: keyof typeof form, value: any) => {
    let newValue = value;

    if (key === "name") {
      newValue = newValue.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
    if (key === "email") {
      newValue = newValue.trim().toLowerCase();
    }
    if (key === "mobile") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) return;
    }

    if (key === "state") {
      setForm((prev) => ({
        ...prev,
        state: newValue,
        city: "", 
      }));
      setErrors((prev) => ({ ...prev, state: "", city: "" }));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: newValue }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setServerError(null);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!NAME_REGEX.test(form.name)) e.name = "Enter a valid name (2-60 chars).";
    if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email address.";
    if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
    if (form.password.length < 8) e.password = "Min 8 characters required.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!form.state) e.state = "Please select a state.";
    if (!form.city) e.city = "Please select a city.";
    if (!isValid) e.captcha = "Incorrect captcha answer.";
    if (!form.agree) e.agree = "You must accept the Terms & Privacy Policy.";
    
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
      const data = await AuthService.signup({
        role: "CUSTOMER",
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        state: form.state,
        city: form.city,
        password: form.password,
        confirm_password: form.confirmPassword,
      });

      setSuccess(
        data?.user ? {
          email: data.user.email,
          mobile: data.user.mobile,
          message: data.message,
        } : null
      );
      refresh();
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Something went wrong. Try again.");
      refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/30 px-3 py-2.5 text-sm bg-white text-gray-800 placeholder:text-gray-400 outline-none transition disabled:bg-gray-50";
  const labelClass = "text-sm font-medium text-gray-700 block mb-1";
  const errorClass = "text-xs text-red-600 mt-1 ml-0.5";

  return (
    <main className="mx-auto max-w-full sm:px-4 font-sans">
      <h1 className="text-2xl font-bold text-center mb-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        Customer Registration
      </h1>
      <p className="text-gray-500 text-center text-sm mb-3 sm:mb-4">
        Create your account to apply for services.
      </p>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#2076C7]/20 shadow-xl w-full mx-auto overflow-hidden transition-all duration-300 relative">
        {!success ? (
          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#2076C7] rounded-full"></span>
              Registration Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputClass} placeholder="Full Name" />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputClass} placeholder="abc@gmail.com" />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>Mobile Number</label>
                <input type="tel" value={form.mobile} onChange={(e) => setField("mobile", e.target.value)} className={inputClass} placeholder="10-digit Mobile" />
                {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
              </div>

              <div>
                <label className={labelClass}>State</label>
                <select value={form.state} onChange={(e) => setField("state", e.target.value)} className={inputClass}>
                  <option value="">Select State</option>
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className={errorClass}>{errors.state}</p>}
              </div>

              <div>
                <label className={labelClass}>City</label>
                <select value={form.city} onChange={(e) => setField("city", e.target.value)} disabled={!form.state} className={inputClass}>
                  <option value="">{form.state ? "Select City" : "Select State first"}</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.city && <p className={errorClass}>{errors.city}</p>}
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => { setField("password", e.target.value); setPasswordStrength(checkPasswordStrength(e.target.value)); }}
                    className={`${inputClass} pr-10`}
                    placeholder="Min 8 chars"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className={`h-1.5 w-16 rounded-full ${passwordStrength.level === "Weak" ? "bg-red-500" : passwordStrength.level === "Medium" ? "bg-orange-500" : "bg-green-500"}`}></div>
                    <span className="font-medium">{passwordStrength.level}</span>
                  </div>
                )}
                {errors.password && <p className={errorClass}>{errors.password}</p>}
              </div>

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
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 text-gray-400">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className={labelClass}>Verification: {a} + {b} = ?</label>
                <div className="flex gap-2">
                  <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className={`${inputClass} w-20 text-center`} placeholder="?" />
                  <button type="button" onClick={refresh} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">↺</button>
                </div>
                {errors.captcha && <p className={errorClass}>{errors.captcha}</p>}
              </div>
            </div>

            <div className="mt-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={(e) => setField("agree", e.target.checked)} className="mt-1 h-4 w-4 text-[#2076C7]" />
                <span className="text-sm text-gray-600">I agree to the <a href="#" className="text-[#2076C7] underline">Terms</a> & <a href="#" className="text-[#2076C7] underline">Privacy Policy</a>.</span>
              </label>
              {errors.agree && <p className={errorClass}>{errors.agree}</p>}
            </div>

            {serverError && <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2"><AlertCircle size={16}/>{serverError}</div>}

            <div className="mt-6">
              <button type="submit" disabled={submitting} className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded-lg text-sm font-medium shadow-md transition-all hover:opacity-90 disabled:opacity-70">
                {submitting ? "Processing..." : "Register Now"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful! 🎉</h2>
            <p className="text-gray-500 mb-6">Welcome! You can now log in to apply for services.</p>
            <p className="mt-6 text-sm text-[#2076C7] animate-pulse">Redirecting to login...</p>
          </div>
        )}
      </div>
    </main>
  );
}