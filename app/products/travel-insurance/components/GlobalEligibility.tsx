'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconMapPin, IconWorld } from '@tabler/icons-react';

const requirements = [
    'Indian passport holders',
    'Traveler age: 6 months to 70 years',
    'Trip duration: Up to 180 days typically',
    'Destination: Domestic and international',
    'Travel purpose: Leisure, business, study',
    'Health: Generally healthy travelers',
];

export default function GlobalEligibility() {
    return (
        <section className="pt-4 pb-12 px-4 md:px-6 lg:px-0">
            <div className="max-w-7xl mx-auto rounded-[2rem] md:rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(32,118,199,0.35)] flex flex-col lg:flex-row border-2 border-[#2076C7]/30 bg-white">

                {/* Left Side: Eligibility Checklist */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Eligibility</span>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                     Quick Eligibility Checklist
                    </h2> 

                    <div className="space-y-4 mb-10">
                        {requirements.map((req, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <div className="bg-[#2076C7]/10 text-[#2076C7] p-1 rounded-full mt-0.5 flex-shrink-0">
                                    <IconCheck size={16} stroke={3} />
                                </div>
                                <span className="text-slate-600 font-medium leading-relaxed">{req}</span>
                            </motion.div>
                        ))}
                    </div>

                    <a href="#contact" className="inline-flex items-center justify-center bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 w-full md:w-auto transition-all">
                        Check Your Eligibility Now
                    </a>
                </motion.div>

                {/* Right Side: Global Network */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 bg-[#2076C7]/5 text-slate-900 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center"
                >
                    {/* Background Map Effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <IconWorld size={400} className="absolute -right-20 -bottom-20 text-[#2076C7]/10" stroke={1} />
                    </div>

                    <div className="relative z-10">
                        <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Global Network</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 gradient-text">
                            Protected Everywhere You Go
                        </h2>
                        <p className="text-[#2076C7]/80 mb-10 text-lg leading-relaxed">
                            Travel stress-free with our 24/7 global assistance and access to quality healthcare across our extensive network of hospital partners.
                        </p>

                        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mb-1">195+</div>
                                <div className="text-xs md:text-sm font-bold text-[#2076C7]/70">Countries Covered</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mb-1">50k+</div>
                                <div className="text-xs md:text-sm font-bold text-[#2076C7]/70">Medical Providers</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mb-1">24/7</div>
                                <div className="text-xs md:text-sm font-bold text-[#2076C7]/70">Global Assistance</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['🇺🇸 USA', '🇬🇧 UK', '🇪🇺 Schengen', '🇦🇪 UAE', '🇹🇭 Thailand', '🇦🇺 Australia'].map((country, i) => (
                                <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#2076C7] hover:bg-white/80 transition-colors border border-[#2076C7]/20">
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
