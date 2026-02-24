'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { IconSend, IconPhone, IconMail, IconMapPin, IconClock, IconShieldCheck } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

import { useModal } from '@/app/context/ModalContext';

export default function ContactSection() {
    const { openPartner } = useModal();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', destination: '', duration: '', travelers: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network delay if needed, or just redirect immediately
        await new Promise(resolve => setTimeout(resolve, 500));
        openPartner();
    };

    return (
        <section id="contact" className="py-12 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-3">Free Expert Consultation</h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Interested in our travel insurance solutions? Fill the form below and speak with our certified expert advisors.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Full Name *</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        type="text"
                                        placeholder="Nirmal Shukla"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                                    <input
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        type="tel"
                                        placeholder="+91 XXXX000000"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    type="email"
                                    placeholder="nirmal@gmail.com.com"
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Destination *</label>
                                    <input
                                        required
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        type="text"
                                        placeholder="e.g. Europe"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Trip Duration</label>
                                    <input
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        type="text"
                                        placeholder="e.g. 15 days"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">No. of Travelers</label>
                                    <input
                                        value={formData.travelers}
                                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                                        type="number"
                                        placeholder="e.g. 2"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 hover:bg-white"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-70 flex justify-center items-center gap-3"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={22} />
                                ) : (
                                    <>
                                        <IconSend size={20} />
                                        Check Price Now
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-center text-slate-400">Available Mon-Sat: 10AM - 7PM.</p>

                            <div className="flex gap-4 mt-4">
                                <div className="flex-1 rounded-xl overflow-hidden h-28 relative">
                                    <Image src="/travel insurance/travelinsurace.png" alt="Travel Protection" fill className="object-cover" />
                                </div>
                                <div className="flex-1 rounded-xl overflow-hidden h-28 relative">
                                    <Image src="/travel insurance/insurance.jfif" alt="Baggage Coverage" fill className="object-cover" />
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {[
                            { icon: IconMapPin, title: 'Head Office', desc: '1001 & 1201, 7 Business Square Shivajinagar, Pune,\n MH 411016 ' },
                            { icon: IconPhone, title: 'Toll-Free', desc: '1800-532-7600' },
                            { icon: IconMail, title: 'Email Support', desc: 'info@infinityarthvishva.com' },
                        ].map((info, i) => (
                            <div key={i} className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <info.icon size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{info.title}</h4>
                                    <p className="text-sm text-slate-500 mt-1 whitespace-pre-line">{info.desc}</p>
                                </div>
                            </div>
                        ))}

                        {/* Trust Badges - Styled like Navbar */}
                        <div className="bg-linear-to-br from-[#E8F6FA] via-[#F0FAFB] to-[#E9F8F6] backdrop-blur-md rounded-2xl p-6 text-slate-700 shadow-sm border border-[#1CADA3]/20">
                            <h4 className="font-bold mb-4 text-[#2076C7] uppercase tracking-wider text-xs">Why Trust Us?</h4>
                            <div className="space-y-3 text-sm">
                                {['IRDAI Certified Partners', '98% Claim Settlement Ratio', '50,000+ Satisfied Customers', 'A+ Rated Insurers Only'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-medium">
                                        <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
