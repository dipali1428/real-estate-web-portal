'use client';

import { motion } from 'framer-motion';
import { PiggyBank, Briefcase, BarChart3, Unlock, Globe, HeartHandshake } from 'lucide-react';

const features = [
    {
        icon: PiggyBank,
        title: 'Tax Benefit',
        description: 'Save tax up to ₹50,000 u/s 80CCD(1B) over and above ₹1.5 Lakhs u/s 80C.'
    },
    {
        icon: BarChart3,
        title: 'Market Linked Returns',
        description: 'Earn market-linked returns over the long term, outperforming traditional savings.'
    },
    {
        icon: Unlock,
        title: 'Flexibility',
        description: 'Choice to decide asset allocation and pension fund manager as per your risk appetite.'
    },
    {
        icon: Briefcase,
        title: 'Portability',
        description: 'Seamlessly transfer your NPS account across jobs and locations anywhere in India.'
    },
    {
        icon: Globe,
        title: 'Online Access',
        description: 'Full online access 24/7 through app and web portal to track and manage your investments.'
    },
    {
        icon: HeartHandshake,
        title: 'Superannuation',
        description: 'Ideal retirement planning tool to ensure financial independence post-retirement.'
    }
];

export default function Features() {
    return (
        <section id="features" className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold text-slate-600 tracking-wider uppercase text-sm">Why Choose NPS?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Unmatched Benefits of NPS
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center">
                            <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-linear-to-r group-hover:from-[#1CADA3] group-hover:to-[#2076C7] group-hover:shadow-[0_10px_20px_rgba(32,118,199,0.2)] transition-all duration-300">
                                <feature.icon className="w-10 h-10 text-[#2076C7] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
