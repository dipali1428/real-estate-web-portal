"use client"
import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion";
import { useState } from "react";
import { AuthService } from "../services/authService";

const ContactSection = () => {
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
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
    <section id="contact" className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            We are here to help, contact us for a free consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Address</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <p className="text-gray-600">
                  1001 & 1201, 7 Business Square by Naiknavare,
                  Ganeshkhind Rd, Near Datta Mandir, Model Colony,
                  Shivajinagar, Pune, Maharashtra 411016
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <p className="text-gray-600">1800-532-7600</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <p className="text-gray-600">info@infinityarthvishva.com</p>
              </div>
            </div>

            <div className="rounded-lg h-64 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.567683154472!2d73.83634507516995!3d18.543631682537887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06cb7e90001%3A0x2c2f8f5e4e4e4e4e!2s7%20Business%20Square%20by%20Naiknavare%2C%20Ganeshkhind%20Road!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              // title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Send Us A Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] placeholder:text-gray-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] placeholder:text-gray-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] placeholder:text-gray-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] placeholder:text-gray-500">
              </textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded font-semibold shadow-md hover:shadow-lg transition cursor-pointer">
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 text-sm font-medium mt-2">{success}</p>
              )}
              {error && <p className="text-red-600 text-sm font-medium mt-2">{error}</p>}
            </form>
          </div>

        </div>
      </div>

      <section className="relative py-20 overflow-hidden rounded-2xl">
        <div className="relative container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Our Pan-India Presence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-700 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            With branches across <span className="font-semibold text-green-500">20+ cities</span>, Infinity Arthvishva is empowering clients nationwide through trusted financial solutions.
          </motion.p>

          {/* Cities grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="flex flex-wrap justify-center gap-3">
            {cities.map((city, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#22c55e", // Tailwind green-500
                  textShadow: "0 0 10px rgba(34,197,94,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-4 py-2 text-sm md:text-base text-gray-700 rounded-full cursor-pointer border border-gray-200 hover:text-green-500 transition-all duration-300">
                {city}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

    </section>
  )
};

export default ContactSection