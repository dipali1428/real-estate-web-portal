"use client"
import { MapPin, Phone, Mail } from "lucide-react"
import { useState } from "react";
import { AuthService } from "../services/authService";

interface ContactSectionProps {
  productName?: string;
}

const ContactSection = ({ productName }: ContactSectionProps) => {
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

    // Name Logic → Capitalize each word
    if (name === "name") {
      newValue = newValue
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    // Email Logic → Standard formatting
    if (name === "email") {
      newValue = newValue.trim().toLowerCase();
    }

    // Phone Logic → Only digits, max 10
    if (name === "phone") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 10) return;
    }

    // Message Logic → Keep raw text
    if (name === "message") {
      newValue = newValue; // no transformation
    }

    setForm({ ...form, [name]: newValue });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;  // At least first + last name
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
      setError("Enter a valid 10-digit.");
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

  const cities = [
    "Pune (Main Branch)", "Mumbai", "Kolhapur & Sangli", "Nashik", "Chiplun",
    "Ratnagiri", "Satara", "Raipur", "Baramati", "Assam", "West Bengal",
    "Chhatrapati Sambhajinagar", "Nagpur", "Yavatmal", "Gurgaon", "Ahilyanagar",
    "Hyderabad", "Indore", "Surat", "Lucknow"
  ];
  return (
<section id="contact" className="bg-white pt-12 pb-20">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
        Get In Touch
      </h2>
      <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

      <p className="text-gray-600 text-lg">
        We are here to help, contact us for a free consultation.
      </p>
    </div>


    {/* CONTACT CARDS */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

      {/* Call Us */}
      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">

        <div className="w-16 h-16 mx-auto mb-4 bg-[#1CADA3]/10 rounded-2xl flex items-center justify-center">
          <Phone className="w-7 h-7 text-[#1CADA3]" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Call Us
        </h3>

        <p className="text-[#1CADA3] font-semibold">
          1800-532-7600
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Mon-Sat, 9 AM - 6 PM
        </p>

      </div>


      {/* Email Us */}
      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">

        <div className="w-16 h-16 mx-auto mb-4 bg-[#1CADA3]/10 rounded-2xl flex items-center justify-center">
          <Mail className="w-7 h-7 text-[#1CADA3]" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Email Us
        </h3>

        <p className="text-[#1CADA3] font-semibold">
          info@infinityarthvishva.com
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Response within 24 hours
        </p>

      </div>


      {/* Visit Us */}
      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">

  <a
    href="https://www.google.com/maps/search/?api=1&query=7+Business+Square+Pune+Shivajinagar+411016"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="w-16 h-16 mx-auto mb-4 bg-[#1CADA3]/10 rounded-2xl flex items-center justify-center hover:bg-[#1CADA3]/20 transition cursor-pointer">
      <MapPin className="w-7 h-7 text-[#1CADA3]" />
    </div>
  </a>

  <h3 className="text-lg font-semibold text-gray-800 mb-2">
    Visit Us
  </h3>

  <p className="text-[#1CADA3] font-semibold">
    7 Business Square  by Naiknavare, shivajinagar, Pune
  </p>

  <p className="text-gray-500 text-sm mt-1">
    Shivajinagar, MH 411016
  </p>

</div>

    </div>


    {/* EXISTING ADDRESS + MAP SECTION */}
    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

      {/* LEFT SIDE */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Our Address
        </h3>

        <div className="space-y-6 mb-8">

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1CADA3]" />
            </div>

            <p className="text-gray-600 leading-relaxed">
              1001 & 1201, 7 Business Square by Naiknavare,
              Ganeshkhind Rd, Near Datta Mandir, Model Colony,
              Shivajinagar, Pune, Maharashtra 411016
            </p>
          </div>


          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1CADA3]" />
            </div>

            <p className="text-gray-700 font-medium">
              1800-532-7600
            </p>
          </div>


          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1CADA3]" />
            </div>

            <p className="text-gray-700 font-medium">
              info@infinityarthvishva.com
            </p>
          </div>

        </div>


        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-sm h-64">
          <iframe
            src="https://www.google.com/maps?q=18.534151,73.839525&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>

      </div>

         {/* RIGHT SIDE FORM */}
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(28,173,163,0.15)] hover:shadow-[0_10px_35px_rgba(32,118,199,0.18)] transition-all duration-300">

  {!success ? (
    <>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
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

        {error && (
          <p className="text-red-600 text-sm font-medium mt-2">
            {error}
          </p>
        )}

      </form>
    </>
  ) : (
    <div className="text-center py-10">
      <h3 className="text-2xl font-semibold text-[#1CADA3] mb-3">
        Enquiry Received Successfully!
      </h3>
      <p className="text-gray-700 text-base">
        Thank you for reaching out to <b>Infinity Arthvishva</b>.<br />
        Our team has received your enquiry and will contact you shortly.<br />
        We have also sent your <strong>Enquiry ID</strong> and additional details to your registered email address.
      </p>
    </div>
  )}

</div> 
    </div>

  </div>
</section>
  )
};

export default ContactSection