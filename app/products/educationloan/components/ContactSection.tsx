'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconPhone, IconMail, IconMapPin, IconSend, IconCheck, IconShieldCheck, IconArrowRight } from '@tabler/icons-react';
import EducationLoanForm from './educationloanform';

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            {/* ── CTA Banner ─────────────────────────────────────────────── */}
            <section className="py-12 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Ready to Fund Your <br className="hidden md:block" />Dream Degree? 🎓
                        </h2>
                        <p className="text-white/80 font-bold text-lg max-w-xl mx-auto leading-relaxed">
                            Apply now for a free eligibility check. Our education loan expert will contact you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setShowForm(true)}
                                className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-[#2076C7] rounded-2xl font-extrabold text-base shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Apply for Education Loan
                                <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="#contact"
                                className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/40 text-white rounded-2xl font-extrabold text-base hover:bg-white/10 transition-all duration-300"
                            >
                                Talk to an Expert
                            </a>
                        </div>
                        <div className="flex items-center justify-center gap-6 pt-1 text-white/60 text-[11px] font-black uppercase tracking-widest">
                            <span>✓ No Application Fee</span>
                            <span>✓ 100% Secure</span>
                            <span>✓ Expert Guidance</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Contact Section ────────────────────────────────────────── */}
            <section id="contact" className="pt-8 pb-12 bg-[#fafcfe] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent -z-0" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-0" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Consult Our Loan Experts
                        </h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium text-base">
                            Have questions about your eligibility, documents, or loan amount? Our specialists are ready to guide you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {[
                                { icon: IconPhone, label: 'Call Support', value: '1800-532-7600', sub: 'Mon–Sat, 9 AM – 6 PM', color: 'bg-blue-100 text-blue-600' },
                                { icon: IconMail, label: 'Email Queries', value: 'info@infinityarthvishva.com', sub: 'Response within 24 hours', color: 'bg-teal-100 text-teal-600' },
                                { icon: IconMapPin, label: 'Office', value: '1001 & 1201, 7 Business Square, Shivajinagar, Pune', sub: 'Pan-India presence', color: 'bg-indigo-100 text-indigo-600' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start p-6 bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.06)] border border-blue-50 hover:border-blue-200 transition-all group text-center md:text-left">
                                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                            <Icon size={26} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-extrabold mb-1">{item.label}</div>
                                            <div className="text-base font-extrabold text-[#2076C7] tracking-tight">{item.value}</div>
                                            <div className="text-xs text-slate-400 font-medium">{item.sub}</div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Promo card */}
                            <div className="p-8 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 mt-4">
                                <div className="absolute -top-10 -right-10 text-white/10 opacity-20 -rotate-12 group-hover:rotate-0 transition-all duration-700">
                                    <IconShieldCheck size={180} stroke={1} />
                                </div>
                                <h4 className="font-extrabold text-2xl mb-4 tracking-tight relative z-10">Free Loan Counselling 🎓</h4>
                                <p className="text-base text-white/90 font-bold leading-relaxed relative z-10">
                                    Our expert will help you pick the best lender, compare interest rates, and prepare a strong application to maximize your loan approval chances.
                                </p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] shadow-[0_48px_80px_-16px_rgba(32,118,199,0.12)] border border-blue-50/50 p-10 relative overflow-hidden"
                        >
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                    <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10">
                                        <IconCheck size={36} className="text-blue-600" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Request Received!</h3>
                                    <p className="text-slate-500 font-bold max-w-xs mx-auto leading-relaxed">Our education loan specialist will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => { setForm({ name: '', phone: '', email: '', course: '', message: '' }); setSubmitted(false); }}
                                        className="mt-10 text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-700 transition-colors"
                                    >
                                        Back to Form
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">Get a Free Callback</h3>
                                        <p className="text-slate-400 text-sm font-bold mt-3">Fill in your details and we'll reach out to you.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Full Name *</label>
                                            <input required type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Phone *</label>
                                            <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                                        <input type="email" placeholder="yourname@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all" />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Course / Destination *</label>
                                        <input required type="text" placeholder="e.g. MS in CS / USA" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-[#fafcfe] border border-blue-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 text-slate-700 font-bold placeholder:text-slate-300 transition-all" />
                                    </div>

                                    <div className="pt-2">
                                        <button type="submit" className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-[0_15px_30px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(32,118,199,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group">
                                            Request Callback <IconSend size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                        <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-widest mt-5">
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
                            <span className="font-bold text-slate-800">Disclaimer:</span> The information provided on this page is for general informational purposes only. Interest rates, loan amounts, and eligibility criteria are indicative and subject to change without prior notice based on lender policies, RBI guidelines, and applicant profile. This does not constitute a financial offer or commitment. Prospective borrowers are advised to independently verify all loan terms with respective banks, NBFCs, or lending institutions before making any decision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {showForm && <EducationLoanForm onClose={() => setShowForm(false)} />}
        </>
    );
}
