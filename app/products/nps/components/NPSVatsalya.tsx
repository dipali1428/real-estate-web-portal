'use client';

import { Baby, MoveRight, RefreshCw, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '@/app/context/ModalContext';

const benefits = [
    {
        icon: Baby,
        title: 'Start Early (0–18 Years)',
        desc: 'Open an account for your minor child and gift them the powerful advantage of early wealth creation from birth.',
    },
    {
        icon: TrendingUp,
        title: 'Compound Growth',
        desc: 'Benefit from market-linked returns that grow exponentially over a long-term investment horizon of up to 60 years.',
    },
    {
        icon: RefreshCw,
        title: 'Seamless Transition',
        desc: 'Auto-converts to a regular Tier-I NPS account upon attaining adulthood, preserving all accumulated wealth.',
    }
];

export default function NPSVatsalya() {
    const { openLogin } = useModal();

    return (
        <section id="nps-vatsalya" className="relative py-12 md:py-16 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header - Centered & Styled */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block bg-teal-50 border border-teal-100 text-[#1CADA3] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            New Government Initiative
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent pb-1">
                            NPS Vatsalya
                        </h2>

                        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
                            A specialized pension scheme for minors, leveraging the power of <span className="text-[#1CADA3] font-bold">compounding</span> for lifelong financial security.
                        </p>
                    </motion.div>
                </div>

                {/* Benefits Grid - Centered Icons & Shadowed Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, i) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white p-10 rounded-[2rem] border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-teal-100/50 transition-all duration-300 flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-[#1CADA3] shadow-inner mb-6 group-hover:bg-[#1CADA3] group-hover:text-white transition-all duration-300">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed px-2">
                                    {benefit.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Compact Info Card + CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 text-center sm:text-left">
                            <div className="flex flex-col items-center sm:items-start">
                                <p className="text-blue-100/70 text-[10px] font-black uppercase tracking-widest mb-1">Growth Advantage</p>
                                <p className="text-2xl md:text-3xl font-black">60 Yrs of Growth</p>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-white/20" />
                            <div className="flex flex-col items-center sm:items-start">
                                <p className="text-blue-100/70 text-[10px] font-black uppercase tracking-widest mb-1">Entry Requirement</p>
                                <p className="text-2xl md:text-3xl font-black">Age 0–18 Years</p>
                            </div>
                        </div>

                        <button
                            onClick={openLogin}
                            className="w-full lg:w-auto px-10 py-5 bg-white text-[#2076C7] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 cursor-pointer group"
                        >
                            Plan Child&apos;s Future
                            <MoveRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Footer Regulated Tag */}
                <div className="mt-12 flex items-center justify-center gap-3 opacity-50">
                    <ShieldCheck size={18} className="text-slate-400" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">PFRDA Regulated Investment Scheme</span>
                </div>
            </div>
        </section>
    );
}
