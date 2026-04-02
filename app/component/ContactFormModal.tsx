"use client";
import { useState } from "react";
import { AuthService } from "../services/authService";

interface ContactFormModalProps {
    productName?: string;
}

const ContactFormModal = ({ productName }: ContactFormModalProps) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: productName ? `I am interested in applying for ${productName}. Please provide more details.` : "",
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
            setError("Enter a valid 10-digit number.");
            setLoading(false);
            return;
        }

        if (form.message.trim().length < 5) {
            setError("Message should be at least 5 characters.");
            setLoading(false);
            return;
        }

        try {
            const res = await AuthService.contactUs(form);
            setSuccess(`✅ ${res.message} (Enquiry ID: ${res.enquiry_id})`);
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl">
            {!success ? (
                <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 font-sans">
                        Send Us A Message
                    </h3>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1CADA3] focus:shadow-[0_0_10px_rgba(28,173,163,0.25)] text-gray-900 placeholder-gray-500 transition"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1CADA3] focus:shadow-[0_0_10px_rgba(28,173,163,0.25)] text-gray-900 placeholder-gray-500 transition"
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1CADA3] focus:shadow-[0_0_10px_rgba(28,173,163,0.25)] text-gray-900 placeholder-gray-500 transition"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1CADA3] focus:shadow-[0_0_10px_rgba(28,173,163,0.25)] text-gray-900 placeholder-gray-500 resize-none h-32 transition"
                        ></textarea>

                        {error && (
                            <p className="text-red-600 text-sm font-medium mt-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full px-10 py-4 rounded-lg font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: "linear-gradient(to right, #1CADA3, #2076C7)" }}
                        >
                            <div
                                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                                style={{ background: "linear-gradient(to right, #189B8D, #1A68B0)" }}
                            ></div>
                            <span className="relative z-10">{loading ? "Sending..." : "Send Message"}</span>
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#1CADA3]/10 text-[#1CADA3] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        Enquiry Received!
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                        Thank you for your interest in <b>{productName || 'our services'}</b>.<br />
                        Our team has received your details and will get in touch with you shortly. An Enquiry ID has been sent to your email.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContactFormModal;