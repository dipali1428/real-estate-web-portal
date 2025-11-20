"use client";

import React, { useState } from "react";
import { AuthService } from "../../services/authService";

const CreditScorePage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        pan: "",
        dob: "",
        consent: false,
    });
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [cibilResult, setCibilResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        let newValue = value;

        //  Full Name Logic
        if (name === "fullName") {
            newValue = newValue
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of every word
        }

        //  Email Logic
        if (name === "email") {
            newValue = newValue.trim().toLowerCase(); // standard email format
        }

        //  Mobile Logic
        if (name === "mobile") {
            newValue = newValue.replace(/\D/g, ""); // remove non-digits
            if (newValue.length > 10) return;
        }

        //  PAN Logic
        if (name === "pan") {
            newValue = newValue.toUpperCase().replace(/[^A-Z0-9]/g, ""); // uppercase alphanumeric only
            if (newValue.length > 10) return;
        }

        //  Checkbox Logic
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
            return;
        }

        // Save the processed value
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCibilResult(null);

        // 🔍 VALIDATION START
        const fullNameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!fullNameRegex.test(formData.fullName)) {
            setError("Please enter your full name.");
            setLoading(false);
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setError("Enter a valid email address.");
            setLoading(false);
            return;
        }

        if (!mobileRegex.test(formData.mobile)) {
            setError("Enter a valid 10-digit mobile number.");
            setLoading(false);
            return;
        }

        if (!panRegex.test(formData.pan.toUpperCase())) {
            setError("Enter a valid PAN number (e.g., ABCDE1234F).");
            setLoading(false);
            return;
        }

        try {
            const response = await AuthService.checkScore({
                fullName: formData.fullName,
                email: formData.email,
                mobile: formData.mobile,
                pan: formData.pan,
                dob: formData.dob,
            });

            setCibilResult(response.message || "CIBIL request submitted successfully. Score will be updated soon.");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    const faqData = [
        {
            question: "Is checking my CIBIL score really free?",
            answer:
                "Yes, you can check your CIBIL score for free. Some platforms offer free basic reports, while detailed reports may be paid.",
        },
        {
            question: "How often is my CIBIL score updated?",
            answer:
                "Typically every 30-45 days, depending on when your lenders report updates to the credit bureau.",
        },
        {
            question: "What is a good CIBIL score?",
            answer: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>750 &#8211; 900:</strong> Excellent (Easy approvals, best rates)
                    </li>
                    <li>
                        <strong>700 &#8211; 749:</strong> Good (High approval chances)
                    </li>
                    <li>
                        <strong>650 &#8211; 699:</strong> Fair (May get loans with higher interest)
                    </li>
                    <li>
                        <strong>300 &#8211; 649:</strong> Poor (Difficult to get loans)
                    </li>
                </ul>
            ),
        },
        {
            question: "Does checking my CIBIL score affect my credit?",
            answer:
                "No, checking your own score is a \u2018soft inquiry\u2019 and doesn\u2019t affect your credit. Only lender checks (\u2018hard inquiries\u2019) may slightly impact it.",
        },
        {
            question: "What documents are needed?",
            answer: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>PAN Card (mandatory)</li>
                    <li>Mobile number (for OTP)</li>
                    <li>Email address</li>
                    <li>Basic personal details (name, date of birth)</li>
                </ul>
            ),
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] text-white py-20 mb-10">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-2/3 mb-8 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Free CIBIL Score Check
                        </h1>
                        <p className="text-lg md:text-xl mb-6 opacity-90">
                            Instantly check your CIBIL score and monitor your credit health.
                            No hidden charges. No credit card required.
                        </p>
                        <button
                            onClick={() => scrollToSection("check-now")}
                            className="bg-white text-[#1CADA3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Check Score Now ↓
                        </button>
                    </div>
                    <div className="lg:w-1/3 text-center">
                        <i className="fas fa-chart-line text-white text-8xl opacity-70"></i>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-16">
                {/* CIBIL Check Form */}
                <section id="check-now" className="mb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#1CADA3]/20">
                            <h4 className="text-2xl font-semibold text-center text-[#1CADA3] mb-6">
                                Get Your Free CIBIL Score
                            </h4>

                            <form onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="fullName"
                                            className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                            text-gray-800 placeholder-gray-500
                                            focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3] 
                                             focus:outline-none transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                            text-gray-800 placeholder-gray-500
                                            focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3] 
                                            focus:outline-none transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="mobile"
                                            className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Enter your mobile number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                                 text-gray-800 placeholder-gray-500
                                                focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3] 
                                                focus:outline-none transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pan"
                                            className="block text-sm font-medium text-gray-700 mb-2">
                                            PAN Number *
                                        </label>
                                        <input
                                            type="text"
                                            id="pan"
                                            name="pan"
                                            value={formData.pan}
                                            onChange={handleFormChange}
                                            maxLength={10}
                                            required
                                            placeholder="Enter your PAN number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg uppercase
                                         text-gray-800 placeholder-gray-500
                                        focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3] 
                                        focus:outline-none transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="dob"
                                        className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleFormChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                          text-gray-800 placeholder-gray-500
                                            focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3] 
                                            focus:outline-none transition-all duration-200"
                                    />
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleFormChange}
                                            required
                                            className="mt-1 mr-3 w-4 h-4 text-[#1CADA3] border-gray-300 rounded focus:ring-[#1CADA3]"
                                        />
                                        <label
                                            htmlFor="consent"
                                            className="text-sm text-gray-700 leading-snug">
                                            I authorize Infinity Arthviksha to fetch my CIBIL score and report. I
                                            agree to the{" "}
                                            <a
                                                className="text-[#1CADA3] hover:underline font-medium">
                                                Terms & Conditions
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                className="text-[#1CADA3] hover:underline font-medium">
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition disabled:opacity-70 cursor-pointer">
                                        {loading ? "Fetching Score..." : "Get Free CIBIL Score"}
                                    </button>
                                </div>

                                {cibilResult && (
                                    <p className="text-center text-green-600 font-medium mt-4">
                                        {cibilResult}
                                    </p>
                                )}
                                {error && (
                                    <p className="text-center text-red-600 font-medium mt-4">{error}</p>
                                )}
                            </form>

                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-semibold text-[#2076C7] text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="mb-4 p-4 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleFaq(index)}>
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {faq.question}
                                    </h3>
                                    <i
                                        className={`fas ${activeFaq === index ? "fa-chevron-up" : "fa-chevron-down"
                                            } text-[#1CADA3]`}
                                    ></i>
                                </div>
                                {activeFaq === index && (
                                    <div className="mt-3 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CreditScorePage;
