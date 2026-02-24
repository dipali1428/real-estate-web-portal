'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck } from '@tabler/icons-react';

const partners = [
    { name: 'AIG Travel Guard', logo: 'https://placehold.co/150x60?text=AIG' },
    { name: 'Allianz Global', logo: 'https://placehold.co/150x60?text=Allianz' },
    { name: 'Generali Global', logo: 'https://placehold.co/150x60?text=Generali' },
    { name: 'AXA Assistance', logo: 'https://placehold.co/150x60?text=AXA' },
    { name: 'Seven Corners', logo: 'https://placehold.co/150x60?text=Seven+Corners' },
    { name: 'Trawick Int.', logo: 'https://placehold.co/150x60?text=Trawick' },
];

export default function TrustedPartners() {
    return (
        <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-secondary-teal text-sm font-semibold mb-4">
                        <IconShieldCheck size={16} />
                        <span>Trusted by Millions</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gradient">
                        Compare Plans from Top Rated Providers
                    </h2>
                    <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
                        We partner with the world's leading travel insurance underwriters to bring you the best coverage at guaranteed lowest prices.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-center p-4"
                        >
                            {/* Using simple text/placeholder for now to avoid broken images if external links blocked */}
                            <div className="text-lg font-bold text-slate-400 hover:text-primary-blue transition-colors cursor-pointer">
                                {partner.name}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary-teal animate-pulse"></span>
                        A+ Rated Insurers
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary-teal animate-pulse"></span>
                        24/7 Assistance
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary-teal animate-pulse"></span>
                        100% Secure Checkout
                    </div>
                </div>
            </div>
        </section>
    );
}
