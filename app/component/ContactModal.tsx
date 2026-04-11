"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { AuthService } from "../services/authService";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const ContactModal = ({ isOpen, onClose, source = "Credit Card Page" }: ContactModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "name") {
      newValue = newValue.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    }
    if (name === "email") {
      newValue = newValue.trim().toLowerCase();
    }
    if (name === "phone") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) return;
    }

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(form.name)) {
      setError("Please enter your full name (first and last).");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    if (form.message.trim().length < 5) {
      setError("Message should be at least 5 characters.");
      setLoading(false);
      return;
    }

    try {
      // Append source information to the message for backend tracking
      const finalForm = {
        ...form,
        message: `${form.message}\n\n[Note: This request was sent from the ${source}]`
      };
      
      const res = await AuthService.contactUs(finalForm);
      setSuccess(`✅ ${res.message}`);
      setForm({ name: "", email: "", phone: "", message: "" });
      // Close modal after success after a short delay
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-slate-400" />
            </button>

            <div className="p-8 md:p-10">
              {!success ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Send Us A Message</h3>
                    <p className="text-slate-500 font-bold text-sm">Talk to our experts for personalized card advice.</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-bold text-slate-900"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-bold text-slate-900"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-bold text-slate-900"
                        />
                      </div>

                      <textarea
                        name="message"
                        placeholder="How can we help you?"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-bold text-slate-900 resize-none h-32"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#2076C7]/20 hover:shadow-[#2076C7]/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
                    >
                      {loading ? "Sending..." : "Submit Request"}
                    </button>

                    {error && (
                      <p className="text-red-500 text-xs font-bold text-center mt-2 bg-red-50 py-2 rounded-lg border border-red-100 italic">
                        {error}
                      </p>
                    )}
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4">Request Sent!</h3>
                  <p className="text-slate-600 font-bold leading-relaxed">
                    Thank you! Our experts will call you back shortly to assist you with your credit card inquiry.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;