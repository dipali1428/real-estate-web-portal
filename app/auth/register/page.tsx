
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { AuthService } from "@/app/services/authService";
// import { useModal } from "../../context/ModalContext";
// import { Eye, EyeOff } from "lucide-react";

// // --- Regex rules ---
// const NAME_REGEX = /^[A-Za-z ]{2,60}$/;
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const MOBILE_REGEX = /^[6-9]\d{9}$/;

// // Simple math CAPTCHA
// function useMathCaptcha() {
//   const [a, setA] = useState(0);
//   const [b, setB] = useState(0);
//   const [answer, setAnswer] = useState("");

//   const refresh = () => {
//     setA(Math.floor(Math.random() * 8) + 2);
//     setB(Math.floor(Math.random() * 8) + 2);
//     setAnswer("");
//   };

//   useEffect(() => {
//     refresh();
//   }, []);

//   const isValid = useMemo(() => String(a + b) === answer.trim(), [a, b, answer]);
//   return { a, b, answer, setAnswer, refresh, isValid };
// }

// export default function BecomePartnerForm() {
//   const { openLogin, closeAll } = useModal();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     rm_referral: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   // ✅ OTP states
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [registerToken, setRegisterToken] = useState<string | null>(null);
//   const [otpSubmitting, setOtpSubmitting] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState<{ level: string }>({ level: "" });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState<{ adv_id: string; email: string; mobile: string; message: string } | null>(null);
//   const [serverError, setServerError] = useState<string | null>(null);

//   const { a, b, answer, setAnswer, refresh, isValid } = useMathCaptcha();

//   const checkPasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;

//     if (strength <= 2) return { level: "Weak" };
//     if (strength === 3) return { level: "Medium" };
//     return { level: "Strong" };
//   };

//   useEffect(() => {
//     if (success) {
//       const t = setTimeout(() => {
//         closeAll(); // closes registration modal COMPLETELY
//         openLogin(); // open login modal cleanly
//       }, 2000);
//       return () => clearTimeout(t);
//     }
//   }, [success, closeAll, openLogin]);

//   const setField = (key: keyof typeof form, value: any) => {
//     let newValue = value;

//     // Auto-capitalize Name (Full Name → Proper Case)
//     if (key === "name") {
//       newValue = newValue
//         .toLowerCase()
//         .replace(/\b\w/g, (char: string) => char.toUpperCase());
//     }

//     // Normalize Email
//     if (key === "email") {
//       newValue = newValue.trim().toLowerCase();
//     }

//     // Mobile: Only digits + max 10
//     if (key === "mobile") {
//       newValue = newValue.replace(/\D/g, "");
//       if (newValue.length > 10) return;

//       // ✅ If user edits mobile after OTP sent/verified, reset OTP flow
//       if (newValue !== form.mobile) {
//         setOtp("");
//         setOtpSent(false);
//         setOtpVerified(false);
//         setRegisterToken(null);
//       }
//     }

//     setForm((prev) => ({ ...prev, [key]: newValue }));
//     setErrors((prev) => ({ ...prev, [key]: "" }));
//     setServerError(null);
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!NAME_REGEX.test(form.name)) e.name = "Enter a valid name.";
//     if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email.";
//     if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile.";
//     if (form.password.length < 8) e.password = "Min 8 characters required.";
//     if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
//     if (!form.agree) e.agree = "You must agree.";
//     if (!isValid) e.captcha = "Captcha incorrect.";

//     // ✅ Require OTP verified
//     if (!otpVerified) e.otp = "Please verify OTP.";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ✅ Send OTP
//   const onSendOtp = async () => {
//     setServerError(null);

//     // basic checks before sending otp
//     const e: Record<string, string> = {};
//     if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email.";
//     if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile.";
//     setErrors((prev) => ({ ...prev, ...e }));
//     if (Object.keys(e).length) return;

//     setOtpSubmitting(true);
//     try {
//       await AuthService.sendRegisterOtp({ mobile: form.mobile, email: form.email });
//       setOtpSent(true);
//       setOtpVerified(false);
//       setRegisterToken(null);
//       setOtp("");
//     } catch (err: any) {
//       setServerError(err?.response?.data?.message || "Failed to send OTP.");
//     } finally {
//       setOtpSubmitting(false);
//     }
//   };

//   // ✅ Verify OTP
//   const onVerifyOtp = async () => {
//     setServerError(null);

//     if (!otp || otp.length < 4) {
//       setErrors((prev) => ({ ...prev, otp: "Enter OTP." }));
//       return;
//     }

//     setOtpSubmitting(true);
//     try {
//       const res = await AuthService.verifyRegisterOtp({
//         mobile: form.mobile,
//         otp,
//         email: form.email,
//       });

//       setRegisterToken(res?.registerToken || null);
//       setOtpVerified(true);
//       setErrors((prev) => ({ ...prev, otp: "" }));
//     } catch (err: any) {
//       setOtpVerified(false);
//       setRegisterToken(null);
//       setServerError(err?.response?.data?.message || "Invalid OTP.");
//     } finally {
//       setOtpSubmitting(false);
//     }
//   };

//   const onSubmit = async (ev: React.FormEvent) => {
//     ev.preventDefault();
//     setSuccess(null);
//     setServerError(null);

//     if (!validate()) return;
//     if (!registerToken) {
//       setServerError("OTP session expired. Please verify OTP again.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const data = await AuthService.register({
//         name: form.name,
//         email: form.email,
//         mobile: form.mobile,
//         rm_referral: form.rm_referral,
//         password: form.password,
//         confirm_password: form.confirmPassword,
//         registerToken, // ✅ send token
//       });

//       setSuccess(
//         data?.user
//           ? {
//               adv_id: data.user.adv_id,
//               email: data.user.email,
//               mobile: data.user.mobile,
//               message: data.message,
//             }
//           : null
//       );

//       setForm({
//         name: "",
//         email: "",
//         mobile: "",
//         rm_referral: "",
//         password: "",
//         confirmPassword: "",
//         agree: false,
//       });

//       // reset otp + captcha
//       setOtp("");
//       setOtpSent(false);
//       setOtpVerified(false);
//       setRegisterToken(null);

//       refresh();
//       setAnswer("");
//     } catch (err: any) {
//       setServerError(err?.response?.data?.message || "Something went wrong. Try again.");
//       refresh();
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-lg border border-gray-300 focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/30 px-3 py-2.5 text-sm bg-white text-gray-800 placeholder:text-gray-500 outline-none transition";

//   const labelClass = "text-sm font-medium text-gray-700";
//   const errorClass = "text-xs text-red-600 mt-1";

//   return (
//     <main className="container mx-auto px-2">
//       <h1 className="text-2xl font-bold text-center mb-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
//         Become a Partner
//       </h1>
//       <p className="text-gray-500 text-center mt-2 mb-2">Register to access your dashboard.</p>

//       <form
//         onSubmit={onSubmit}
//         className="bg-linear-to-br from-[#E8F6FA] via-[#F9FCFC] to-[#E9F8F6]
//                             p-4 sm:p-6 md:p-8
//                             rounded-2xl border border-[#1CADA3]/20 shadow-lg 
//                             w-full max-w-4xl mx-auto
//                             overflow-y-auto 
//                             max-h-[92vh] sm:max-h-[88vh] md:max-h-[82vh]
//                             scrollbar-thin scrollbar-thumb-[#B4E3DD] scrollbar-track-transparent hover:scrollbar-thumb-[#1CADA3]/40
//                             transition-all duration-300">
//         {!success ? (
//           <>
//             <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
//               {/* Name */}
//               <div>
//                 <label className={labelClass}>Name</label>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => setField("name", e.target.value)}
//                   className={inputClass}
//                   placeholder="Full name"
//                 />
//                 {errors.name && <p className={errorClass}>{errors.name}</p>}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className={labelClass}>Email</label>
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setField("email", e.target.value)}
//                   className={inputClass}
//                   placeholder="abc@gmail.com"
//                 />
//                 {errors.email && <p className={errorClass}>{errors.email}</p>}
//               </div>

//               {/* Mobile + Send OTP */}
//               <div>
//                 <label className={labelClass}>Mobile</label>

//                 <div className="flex items-center gap-2">
//                   <input
//                     type="tel"
//                     value={form.mobile}
//                     onChange={(e) => setField("mobile", e.target.value)}
//                     className={inputClass}
//                     placeholder="Phone"
//                     disabled={otpSent && !otpVerified ? true : false}
//                   />

//                   <button
//                     type="button"
//                     onClick={onSendOtp}
//                     disabled={otpSubmitting || otpSent}
//                     className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700 cursor-pointer whitespace-nowrap disabled:opacity-60"
//                   >
//                     {otpSent ? "OTP Sent" : otpSubmitting ? "Sending..." : "Send OTP"}
//                   </button>
//                 </div>

//                 {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
//               </div>

//               {/* OTP + Verify OTP (shows only after send) */}
//               <div>
//                 <label className={labelClass}>OTP</label>

//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
//                     className={inputClass}
//                     placeholder={otpSent ? "Enter OTP" : "Send OTP first"}
//                     disabled={!otpSent || otpVerified}
//                   />

//                   <button
//                     type="button"
//                     onClick={onVerifyOtp}
//                     disabled={!otpSent || otpSubmitting || otpVerified}
//                     className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700 cursor-pointer whitespace-nowrap disabled:opacity-60"
//                   >
//                     {otpVerified ? "Verified" : otpSubmitting ? "Verifying..." : "Verify OTP"}
//                   </button>
//                 </div>

//                 {(errors.otp || (!otpVerified && otpSent && otp.length > 0 && serverError)) && (
//                   <p className={errorClass}>{errors.otp || ""}</p>
//                 )}
//                 {!otpVerified && errors.otp && <p className={errorClass}>{errors.otp}</p>}
//                 {otpVerified && <p className="text-xs text-green-600 mt-1">OTP verified successfully.</p>}
//               </div>

//               {/* RM Referral */}
//               <div>
//                 <label className={labelClass}>
//                   RM Referral Code <span className="text-gray-400 text-sm">(Optional)</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={form.rm_referral}
//                   onChange={(e) => setField("rm_referral", e.target.value)}
//                   className={inputClass}
//                   placeholder="If referred by an RM, ask them for their Referral Code"
//                 />
//                 {errors.rm_referral && <p className={errorClass}>{errors.rm_referral}</p>}
//               </div>

//               {/* Password */}
//               <div>
//                 <label className={labelClass}>Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={form.password}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setField("password", value);
//                       setPasswordStrength(checkPasswordStrength(value));
//                     }}
//                     className={`${inputClass} pr-10`}
//                     placeholder="Minimum 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>

//                 {form.password && (
//                   <div className="mt-1 flex items-center gap-2 text-xs">
//                     <div
//                       className={`h-1.5 w-16 rounded-full transition-all ${
//                         passwordStrength.level === "Weak"
//                           ? "bg-red-500"
//                           : passwordStrength.level === "Medium"
//                           ? "bg-orange-500"
//                           : passwordStrength.level === "Strong"
//                           ? "bg-green-500"
//                           : "bg-gray-300"
//                       }`}
//                     ></div>

//                     <span
//                       className={`font-medium ${
//                         passwordStrength.level === "Weak"
//                           ? "text-red-600"
//                           : passwordStrength.level === "Medium"
//                           ? "text-orange-600"
//                           : passwordStrength.level === "Strong"
//                           ? "text-green-600"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {passwordStrength.level}
//                     </span>
//                   </div>
//                 )}

//                 <p className="text-xs text-gray-500 mt-1">
//                   Use at least 8 characters, including one uppercase, one lowercase, one number, and one special symbol.
//                 </p>
//                 {errors.password && <p className={errorClass}>{errors.password}</p>}
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className={labelClass}>Confirm Password</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={form.confirmPassword}
//                     onChange={(e) => setField("confirmPassword", e.target.value)}
//                     className={`${inputClass} pr-10`}
//                     placeholder="Re-enter password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
//                   >
//                     {/* optional icons */}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
//               </div>

//               {/* Captcha */}
//               <div className="md:col-span-2">
//                 <label className={labelClass}>Captcha</label>
//                 <div className="flex items-center gap-3">
//                   <div className="select-none rounded-lg border border-dashed border-gray-300 bg-white px-3 py-1.5 text-sm sm:text-sm text-gray-700">
//                     What is <b>{a}</b> + <b>{b}</b>?
//                   </div>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     value={answer}
//                     onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
//                     className={`${inputClass} max-w-[100px]`}
//                     placeholder="Ans"
//                   />
//                   <button
//                     type="button"
//                     onClick={refresh}
//                     className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
//                   >
//                     Refresh
//                   </button>
//                 </div>
//                 {errors.captcha && <p className={errorClass}>{errors.captcha}</p>}
//               </div>

//               {/* Agree */}
//               <div className="md:col-span-2">
//                 <label className="inline-flex items-center gap-2 text-sm sm:text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     checked={form.agree}
//                     onChange={(e) => setField("agree", e.target.checked)}
//                     className="h-4 w-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]"
//                   />
//                   I agree to the{" "}
//                   <a href="/page/termsconditions" className="underline text-sm sm:text-sm">
//                     Terms
//                   </a>{" "}
//                   &{" "}
//                   <a href="/page/privacypolicy" className="underline text-sm sm:text-sm">
//                     Privacy Policy.
//                   </a>
//                 </label>
//                 <p className="text-red-400 text-xs sm:text-sm">
//                   *Please ensure your Name, Email and PAN are entered correctly. These details cannot be changed later.
//                 </p>
//                 {errors.agree && <p className={errorClass}>{errors.agree}</p>}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-10">
//             <h2 className="text-2xl font-semibold text-[#1CADA3] mb-4">Registration Successful 🎉</h2>
//             <div className="inline-block w-full sm:w-auto bg-white shadow-md rounded-xl p-5 sm:p-6 border border-[#1CADA3]/20 text-left">
//               <p className="text-gray-700 mb-2">
//                 <b>Advisor ID:</b> {success.adv_id}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <b>Email:</b> {success.email}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <b>Mobile:</b> {success.mobile}
//               </p>
//             </div>
//             <p className="mt-5 text-sm text-gray-600">
//               {success.message}
//               You can login using your registered email and password.
//             </p>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full">
//           <button
//             type="submit"
//             disabled={submitting || !otpVerified}
//             className="w-full sm:w-auto flex-1 sm:flex-none bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-2.5 rounded-lg shadow hover:shadow-md disabled:opacity-60 text-sm">
//             {submitting ? "Submitting..." : "Register"}
//           </button>

//           <button
//             type="button"
//             onClick={openLogin}
//             className="w-full sm:w-auto flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700  cursor-pointer">
//             Login
//           </button>
//         </div>

//         {serverError && (
//           <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
//             {serverError}
//           </div>
//         )}
//       </form>
//     </main>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthService } from "@/app/services/authService";
import { useModal } from "../../context/ModalContext";
import { Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft, Smartphone, ShieldCheck } from "lucide-react";

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

export default function BecomePartnerForm() {
  const { openLogin, closeAll } = useModal();

  // --- Form State ---
  const [step, setStep] = useState(1); // 1: Basic Details, 2: Verification
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    rm_referral: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  // --- OTP & Auth State ---
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [registerToken, setRegisterToken] = useState<string | null>(null);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // --- UI State ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{ level: string }>({ level: "" });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ adv_id: string; email: string; mobile: string; message: string } | null>(null);
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
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [success, closeAll, openLogin]);

  // OPT Timer
  useEffect(() => {
    if (otpTimer === 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

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

      // Reset OTP if mobile changes
      if (newValue !== form.mobile) {
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setRegisterToken(null);
        setOtpTimer(0);
      }
    }

    setForm((prev) => ({ ...prev, [key]: newValue }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setServerError(null);
  };

  // --- Validations ---

  // Validate Step 1 (Basic Info)
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!NAME_REGEX.test(form.name)) e.name = "Enter a valid name (2-60 chars).";
    if (!EMAIL_REGEX.test(form.email)) e.email = "Enter a valid email address.";
    if (!MOBILE_REGEX.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
    if (form.password.length < 8) e.password = "Min 8 characters required.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Validate Step 2 (Submission)
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

  // --- API Actions ---

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
        name: form.name,
        email: form.email,
        mobile: form.mobile,
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

      // Clear sensitive states
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setRegisterToken(null);
      refresh();
      setAnswer("");

    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Something went wrong. Try again.");
      refresh();
    } finally {
      setSubmitting(false);
    }
  };

  // --- Styles ---
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
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-4 sm:mb-6 scale-90 sm:scale-100">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step === 1 ? "bg-[#1CADA3] text-white" : "bg-green-100 text-green-700"}`}>1</div>
              <div className={`w-16 h-1 mx-2 rounded-full transition-colors ${step === 2 ? "bg-[#1CADA3]" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step === 2 ? "bg-[#1CADA3] text-white" : "bg-gray-100 text-gray-400"}`}>2</div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">

              {/* --- STEP 1: Basic Details --- */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#1CADA3] rounded-full"></span>
                    Basic Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name */}
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className={inputClass}
                        placeholder="e.g. John Doe"
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

                    {/* Mobile (Editable here) */}
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

                    {/* RM Referral */}
                    <div>
                      <label className={labelClass}>
                        RM Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.rm_referral}
                        onChange={(e) => setField("rm_referral", e.target.value)}
                        className={inputClass}
                        placeholder="Referral Code"
                      />
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

                      {/* Password Strength Indicator */}
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

              {/* --- STEP 2: Verification & Submit --- */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#1CADA3] rounded-full"></span>
                    Verification
                  </h3>

                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-4">
                    {/* Mobile Summary */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Smartphone size={18} className="text-[#1CADA3]" />
                        <span className="text-sm font-medium">Verifying: +91 {form.mobile}</span>
                      </div>
                      {otpVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium flex items-center gap-1"><CheckCircle size={12} /> Verified</span>}
                    </div>

                    {/* Send OTP Button (If not sent yet) */}
                    {!otpSent && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={onSendOtp}
                          disabled={otpSubmitting}
                          className="w-full bg-white border border-[#1CADA3] text-[#1CADA3] hover:bg-[#1CADA3]/5 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
                        >
                          {otpSubmitting ? "Sending OTP..." : "Send OTP"}
                        </button>
                        {serverError && <p className="text-xs text-red-600 text-center">{serverError}</p>}
                      </div>
                    )}

                    {/* Verify OTP Input (If sent) */}
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
                            className="px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm whitespace-nowrap hover:bg-[#178f87] disabled:opacity-70"
                          >
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
                        {serverError && <p className={errorClass}>{serverError}</p>}
                      </div>
                    )}
                  </div>

                  {/* Math Captcha */}
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

                  {/* Agreement */}
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

                  <p className="text-xs text-gray-400 mt-2 italic">
                    *Please ensure your Name, Email, and Mobile Number are entered correctly during registration.
                  </p>

                  {/* Step 2 Buttons */}
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
