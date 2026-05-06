"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthService } from "@/app/services/authService";
import { useModal } from "../../context/ModalContext";
import { Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft, Smartphone, ShieldCheck, AlertCircle, User, Building2 } from "lucide-react";
import { STATES_CITIES } from "@/app/data/statesCities";

const states = Object.keys(STATES_CITIES);

const NAME_REGEX = /^[A-Za-z ]{2,60}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

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

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    entity_type: "Individual", // New State Field
    firm_type: "",
    role: "DSA",
    name: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    rm_referral: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const COMPANY_TYPES = [
    { label: "LLP", value: "LLP" },
    { label: "Private Limited", value: "PVT_LTD" },
    { label: "Partnership Firm", value: "PARTNERSHIP" },
  ];
  const cities = useMemo(() => {
    return form.state ? STATES_CITIES[form.state] || [] : [];
  }, [form.state]);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [registerToken, setRegisterToken] = useState<string | null>(null);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{ level: string }>({ level: "" });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ adv_id: string; email: string; mobile: string; message: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { a, b, answer, setAnswer, refresh, isValid } = useMathCaptcha();

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

  useEffect(() => {
    if (otpTimer === 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Referral Code Handler
  useEffect(() => {
    const ref = localStorage.getItem("referral_code");

    if (ref) {
      setField("rm_referral", ref);
    }
  }, []);

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

      if (newValue !== form.mobile) {
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setRegisterToken(null);
        setOtpTimer(0);
      }
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

  const validateStep1 = () => {
    const e: Record<string, string> = {};

    if (!NAME_REGEX.test(form.name)) e.name = form.entity_type === "Individual" ? "Enter a valid name (2-60 chars)." : "Enter a valid company name.";
    if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email address.";
    if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";

    if (form.password.length < 8) e.password = "Min 8 characters required.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";

    if (!form.state) e.state = "Please select a state.";
    if (!form.city) e.city = "Please select a city.";
    if (form.entity_type === "Non-Individual" && !form.firm_type) {
      e.company_type = "Please select company type.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.agree) e.agree = "You must accept the Terms & Privacy Policy.";
    if (!isValid) e.captcha = "Incorrect captcha answer.";
    if (!otpVerified) e.otp = "Please verify your mobile OTP.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setServerError(null);
      setStep(2);
    }

  };

  const handlePrevStep = () => {
    setServerError(null);
    setStep(1);
  };

  const onSendOtp = async () => {
    setServerError(null);
    setOtpSubmitting(true);
    try {
      await AuthService.sendRegisterOtp({ mobile: form.mobile, email: form.email });
      setOtpSent(true);
      setOtpTimer(45);
      setOtpVerified(false);
      setRegisterToken(null);
      setOtp("");
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setOtpSubmitting(false);
    }
  };

  const onVerifyOtp = async () => {
    setServerError(null);
    if (!otp || otp.length < 4) {
      setErrors((prev) => ({ ...prev, otp: "Enter valid OTP." }));
      return;
    }

    setOtpSubmitting(true);
    try {
      const res = await AuthService.verifyRegisterOtp({
        mobile: form.mobile,
        otp,
        email: form.email,
      });

      setRegisterToken(res?.registerToken || null);
      setOtpVerified(true);
      setOtpTimer(0);
      setErrors((prev) => ({ ...prev, otp: "" }));
    } catch (err: any) {
      setOtpVerified(false);
      setRegisterToken(null);
      setServerError(err?.response?.data?.message || "Invalid OTP.");
    } finally {
      setOtpSubmitting(false);
    }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccess(null);
    setServerError(null);

    if (!validateStep2()) return;
    if (!registerToken) {
      setServerError("OTP session expired. Please verify OTP again.");
      return;
    }

    setSubmitting(true);

    try {
      const data = await AuthService.register({
        entity_type: form.entity_type, // Passing the new field
        firm_type: form.firm_type,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        state: form.state,
        city: form.city,
        rm_referral: form.rm_referral,
        password: form.password,
        confirm_password: form.confirmPassword,
        registerToken,
      });

      setSuccess(
        data?.user
          ? {
            adv_id: data.user.adv_id,
            email: data.user.email,
            mobile: data.user.mobile,
            message: data.message,
          }
          : null
      );

      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setRegisterToken(null);
      refresh();
      setAnswer("");

      localStorage.removeItem("referral_code");
      localStorage.removeItem("ref_handled");

    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Something went wrong. Try again.");
      refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30 px-3 py-2.5 text-sm bg-white text-gray-800 placeholder:text-gray-400 outline-none transition disabled:bg-gray-50 disabled:text-gray-500";
  const labelClass = "text-sm font-medium text-gray-700 block mb-1";
  const errorClass = "text-xs text-red-600 mt-1 ml-0.5";

  return (
    <main className="mx-auto max-w-full sm:px-4 font-sans">
      <h1 className="text-2xl font-bold text-center mb-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        Become a Partner
      </h1>
      <p className="text-gray-500 text-center text-sm mb-3 sm:mb-4">Register to access your DSA dashboard.</p>

      <div
        className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#1CADA3]/20 shadow-xl 
             w-full mx-auto overflow-hidden transition-all duration-300 relative">
        {!success ? (
          <>
            <div className="flex items-center justify-center mb-4 sm:mb-6 scale-90 sm:scale-100">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step === 1 ? "bg-[#1CADA3] text-white" : "bg-green-100 text-green-700"}`}>1</div>
              <div className={`w-16 h-1 mx-2 rounded-full transition-colors ${step === 2 ? "bg-[#1CADA3]" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step === 2 ? "bg-[#1CADA3] text-white" : "bg-gray-100 text-gray-400"}`}>2</div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#1CADA3] rounded-full"></span>
                    Basic Details
                  </h3>

                  {/* --- NEW: Entity Type Selector --- */}
                  <div className="mb-6">
                    <label className={labelClass}>Register As</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setField("entity_type", "Individual")}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${form.entity_type === "Individual"
                          ? "bg-white text-[#1CADA3] shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        <User size={16} />
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setField("entity_type", "Non-Individual")}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${form.entity_type === "Non-Individual"
                          ? "bg-white text-[#1CADA3] shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        <Building2 size={16} />
                        Non-Individual
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {form.entity_type === "Non-Individual" && (
                      <div>
                        <label className={labelClass}>Company Type</label>
                        <select
                          value={form.firm_type}
                          onChange={(e) => setField("firm_type", e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select Company Type</option>
                          {COMPANY_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {errors.company_type && <p className={errorClass}>{errors.company_type}</p>}
                      </div>
                    )}
                    {/* Dynamic Label for Name */}
                    <div>
                      <label className={labelClass}>
                        {form.entity_type === "Individual" ? "Full Name" : "Company / Firm Name"}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className={inputClass}
                        placeholder={form.entity_type === "Individual" ? "e.g. John Doe" : "e.g. Acme Solutions Pvt Ltd"}
                      />
                      {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className={inputClass}
                        placeholder="e.g. abc@gmail.com"
                      />
                      {errors.email && <p className={errorClass}>{errors.email}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className={labelClass}>Mobile Number</label>
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => setField("mobile", e.target.value)}
                        className={inputClass}
                        placeholder="10-digit Mobile"
                      />
                      {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
                    </div>

                    {/* Referral */}
                    <div>
                      <label className={labelClass}>
                        Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.rm_referral}
                        onChange={(e) => setField("rm_referral", e.target.value)}
                        className={inputClass}
                        placeholder="Referral Code"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className={labelClass}>State</label>
                      <select
                        value={form.state}
                        onChange={(e) => setField("state", e.target.value)}
                        className={`${inputClass} ios-select`}>
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className={errorClass}>{errors.state}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className={labelClass}>City</label>
                      <select
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        disabled={!form.state}
                        className={inputClass}>
                        <option value="">
                          {form.state ? "Select City" : "Select State first"}
                        </option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {errors.city && <p className={errorClass}>{errors.city}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className={labelClass}>Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={(e) => {
                            setField("password", e.target.value);
                            setPasswordStrength(checkPasswordStrength(e.target.value));
                          }}
                          className={`${inputClass} pr-10`}
                          placeholder="Min 8 chars"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {form.password && (
                        <div className="mt-2 flex items-center gap-2 text-xs">
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
                          <span className={`font-medium ${passwordStrength.level === "Weak" ? "text-red-600" :
                            passwordStrength.level === "Medium" ? "text-orange-600" :
                              passwordStrength.level === "Strong" ? "text-green-600" : "text-gray-500"
                            }`}>
                            {passwordStrength.level}
                          </span>
                        </div>
                      )}
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
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto bg-[#1CADA3] hover:bg-[#178f87] text-white px-8 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                      Next Step <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 remained mostly unchanged, but will now send entity_type on submit */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#1CADA3] rounded-full"></span>
                    Verification
                  </h3>

                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Smartphone size={18} className="text-[#1CADA3]" />
                        <span className="text-sm font-medium">Verifying: +91 {form.mobile}</span>
                      </div>
                      {otpVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium flex items-center gap-1"><CheckCircle size={12} /> Verified</span>}
                    </div>

                    {!otpSent && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={onSendOtp}
                          disabled={otpSubmitting}
                          className="w-full bg-white border border-[#1CADA3] text-[#1CADA3] hover:bg-[#1CADA3]/5 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60">
                          {otpSubmitting ? "Sending OTP..." : "Send OTP"}
                        </button>
                      </div>
                    )}

                    {otpSent && !otpVerified && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                            className={`${inputClass} text-center tracking-widest text-lg font-semibold sm:max-w-none`}
                            placeholder="0 0 0 0 0 0"
                          />
                          <button
                            type="button"
                            onClick={onVerifyOtp}
                            disabled={otpSubmitting}
                            className="px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm whitespace-nowrap hover:bg-[#178f87] disabled:opacity-70">
                            {otpSubmitting ? "..." : "Verify"}
                          </button>
                        </div>
                        <div className="flex justify-between items-start">
                          <p className="text-xs text-gray-500">OTP sent to your mobile</p>
                          <button
                            type="button"
                            onClick={onSendOtp}
                            disabled={otpTimer > 0 || otpSubmitting}
                            className={`text-xs font-medium ${otpTimer > 0
                              ? "text-red-400 cursor-not-allowed"
                              : "text-[#2076C7] hover:underline"
                              }`}>
                            {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                          </button>                        </div>
                        {errors.otp && <p className={errorClass}>{errors.otp}</p>}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Human Verification</label>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-mono text-sm select-none">
                        {a} + {b} = ?
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
                        className={`${inputClass} w-20 max-w-[50px] text-center`}
                        placeholder="?"
                      />
                      <button
                        type="button"
                        onClick={refresh}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                        title="Refresh Captcha">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
                      </button>
                    </div>
                    {errors.captcha && <p className={errorClass}>{errors.captcha}</p>}
                  </div>

                  <div className="mt-4 bg-[#E8F6FA]/50 p-3 rounded-lg border border-[#1CADA3]/10">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setField("agree", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]"
                      />
                      <div className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="/page/termsconditions" className="text-[#2076C7] hover:underline font-medium">Terms of Service</a>{" "}
                        &{" "}
                        <a href="/page/privacypolicy" className="text-[#2076C7] hover:underline font-medium">Privacy Policy</a>.
                      </div>
                    </label>
                    {errors.agree && <p className={errorClass}>{errors.agree}</p>}
                  </div>

                  {serverError && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2 text-red-700 text-sm animate-shake">
                      <AlertCircle className="w-4 h-4" />
                      <p className="font-medium">{serverError}</p>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-2 italic">
                    *Please ensure your details match your official documents.
                  </p>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                      <ArrowLeft size={16} /> Back
                    </button>

                    <button
                      type="submit"
                      disabled={submitting || !otpVerified}
                      className="w-full sm:flex-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60 text-sm font-medium flex items-center justify-center gap-2">
                      {submitting ? "Registering..." : "Complete Registration"} <ShieldCheck size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="text-center py-12 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Aboard! 🎉</h2>
            <p className="text-gray-500 mb-6">Your partner account has been created successfully.</p>

            <div className="bg-slate-50 p-5 rounded-xl border border-dashed border-gray-300 inline-block text-left w-full sm:w-auto min-w-[280px]">
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Advisor ID:</span>
                  <span className="font-semibold">{success.adv_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-semibold">{success.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile:</span>
                  <span className="font-semibold">{success.mobile}</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#1CADA3] animate-pulse">Redirecting to login...</p>
          </div>
        )}

        {!success && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button onClick={openLogin} className="text-[#2076C7] font-medium hover:underline">
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}