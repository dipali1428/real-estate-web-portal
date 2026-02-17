'use client';

import { motion } from 'framer-motion';

export default function AboutNPS() {
    return (
        <section id="about-nps" className="relative py-12 bg-white overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-blue-50/40 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow pb-2">
                        What is National Pension System?
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 text-slate-800 text-base leading-relaxed font-medium"
                    >
                        <p>
                            The <strong className="text-gray-900 font-black">National Pension System (NPS)</strong> is a voluntary, defined contribution retirement savings scheme designed to enable systematic savings during your working life. It is regulated by the <strong className="text-[#2076C7] font-black">PFRDA</strong>.
                        </p>
                        <p>
                            NPS creates a large corpus for your retirement through market-linked returns. On retirement, you can withdraw <span className="bg-blue-50 text-[#2076C7] px-2 py-0.5 rounded font-black">60% Tax-Free</span> lump sum and convert the rest into a monthly pension.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {[
                                "Low-cost Structure",
                                "Flexible Asset Choice",
                                "Portable Account (PRAN)",
                                "Superior Tax Efficiency"
                            ].map((point, i) => (
                                <li key={i} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"></div>
                                    <span className="font-bold text-gray-800 text-sm whitespace-nowrap">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white shadow-xl shadow-blue-100/30 overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl font-black bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow mb-4">Build Your Nest Egg</h3>
                            <p className="text-slate-800 font-medium text-lg mb-10">Start small, grow big with the power of compounding.</p>

                            <div className="flex justify-center items-end gap-5 h-56">
                                {[
                                    { h: "h-20", c: "bg-blue-100" },
                                    { h: "h-32", c: "bg-blue-200" },
                                    { h: "h-44", c: "bg-blue-300" },
                                    { h: "h-56", c: "bg-gradient-to-t from-[#2076C7] to-[#1CADA3] shadow-xl shadow-blue-100" }
                                ].map((bar, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: Number(bar.h.replace('h-', '')) * 4 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15, duration: 1, ease: "easeOut" }}
                                        className={`${bar.h} w-10 ${bar.c} rounded-2xl`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
