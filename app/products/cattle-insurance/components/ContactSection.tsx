'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconPhone, IconMail, IconMapPin, IconSend, IconCheck, IconShieldCheck } from '@tabler/icons-react';

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', email: '', animalType: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contact" className="pt-8 pb-24 bg-white relative overflow-hidden">
            {/* Background Decorative patterns */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent -z-0" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12 relative max-w-4xl mx-auto"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Get In Touch</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Consult Our Experts Today
                    </h2>

                    <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed px-4 md:px-0 text-base md:text-lg">
                        Have questions or want to enroll your livestock? Our agricultural insurance specialists are ready to help you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        {[
                            { icon: IconPhone, label: 'Call Support', value: '1800-532-7600', sub: 'Mon–Sat, 9 AM – 6 PM', color: 'bg-blue-100 text-blue-600' },
                            { icon: IconMail, label: 'Email Queries', value: 'info@infinityarthvishva.com', sub: 'Response within 24 hours', color: 'bg-teal-100 text-teal-600' },
                            { icon: IconMapPin, label: 'Office Presence', value: '1001 & 1201, 7 Business Square Shivajinagar, Pune, MH 411016', sub: '20+ branch offices across India', color: 'bg-indigo-100 text-indigo-600' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start p-6 bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.06)] border border-blue-50 hover:border-blue-200 transition-all group text-center md:text-left">
                                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                        <Icon size={26} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-extrabold mb-1">{item.label}</div>
                                        <div className="text-base md:text-lg font-extrabold text-[#2076C7] tracking-tight">{item.value}</div>
                                        <div className="text-xs md:text-sm text-slate-400 font-medium">{item.sub}</div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Premium info box */}
                        <div className="p-8 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden mt-8 group hover:-translate-y-2 transition-all duration-500">
                            <div className="absolute -top-10 -right-10 text-white/10 opacity-20 -rotate-12 group-hover:rotate-0 transition-all duration-700">
                                <IconShieldCheck size={180} stroke={1} />
                            </div>
                            <h4 className="font-extrabold text-2xl mb-4 tracking-tight relative z-10">Free Farm Consultation</h4>
                            <p className="text-base text-white/90 font-bold leading-relaxed relative z-10">
                                Our specialist will visit your farm, assist in animal health certification, and help you choose the best plan based on the market value of your livestock.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[3rem] shadow-[0_48px_80px_-16px_rgba(32,118,199,0.12)] border border-blue-50/50 p-10 relative overflow-hidden"
                    >

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10">
                                    <IconCheck size={36} className="text-blue-600" strokeWidth={3} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Request Received!</h3>
                                <p className="text-slate-500 font-bold max-w-xs mx-auto leading-relaxed">Our cattle insurance expert will contact you within 24 hours to assist you.</p>
                                <button
                                    onClick={() => {
                                        setForm({ name: '', phone: '', email: '', animalType: '', message: '' });
                                        setSubmitted(false);
                                    }}
                                    className="mt-10 text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-700 transition-colors"
                                >
                                    Back to Form
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-extrabold text-[grey-500] tracking-tight leading-none">Get a Free Quote</h3>
                                    <p className="text-slate-400 text-sm font-bold mt-3">Fill in your details and we'll reach out to you.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Full Name *</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your Name"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Phone Number *</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="yourname@email.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Type of Animal *</label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={form.animalType}
                                            onChange={e => setForm({ ...form, animalType: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold appearance-none cursor-pointer transition-all"
                                        >
                                            <option value="" className="text-slate-300">Select animal type</option>
                                            <option>Cow (Indigenous / Crossbreed)</option>
                                            <option>Buffalo</option>
                                            <option>Bullock & Heifer</option>
                                            <option>Sheep / Goat</option>
                                            <option>Pig</option>
                                            <option>Horse & Mule</option>
                                            <option>Other Livestock</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <IconCheck size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-[0_15px_30px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(32,118,199,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        Submit Enquiry <IconSend size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                    <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-widest mt-6">
                                        🔒 Instant Response Guarantee • 100% Privacy
                                    </p>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-slate-200 text-[12px] leading-relaxed text-[#64748b] text-left md:text-justify"
                >
                    <p>
                        <span className="font-bold text-slate-800">Disclaimer:</span> The information provided on this website is for general informational purposes only. Details related to the insurance providers, associated entities, and their past experience are indicative in nature and subject to change without prior notice. References to completed claims or upcoming policy features do not constitute any assurance of future performance. Any information regarding coverage, connectivity, infrastructure, or development potential of cattle insurance plans is based on current understanding and publicly available sources and may vary over time. Such statements should not be construed as guarantees of future growth or returns. This content does not constitute a legal offer, financial advice, or commitment of any kind. Prospective buyers are advised to independently verify all information with the respective insurance authorities or providers before making any decision.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
