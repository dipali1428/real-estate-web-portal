'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us! Our expert support team will reach out to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500 blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-gradient uppercase tracking-tight">
                        Contact Expert Support
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                        Have questions about fractional ownership? Our specialists are here to guide you through every step of your investment journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Left: Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 transition-all hover:shadow-xl group">
                            <div className="flex gap-6 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-1">Our Location</h4>
                                    <p className="text-slate-500">Model Colony, Shivajinagar, Pune 411016</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 transition-all hover:shadow-xl group">
                            <div className="flex gap-6 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-1">Direct Assistance</h4>
                                    <p className="text-slate-500 font-bold">1800-532-7600</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 transition-all hover:shadow-xl group">
                            <div className="flex gap-6 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-1">Email Support</h4>
                                    <p className="text-slate-500">support@infinityarthvishva.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91"
                                        className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can our experts help you today?"
                                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all transition-all resize-none"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-brand w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                                <Send size={20} /> Send Inquiry
                            </button>

                            <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                                <Shield size={12} /> Institutional-grade privacy & data protection.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
