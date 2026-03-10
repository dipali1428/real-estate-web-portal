'use client';

import { motion } from 'framer-motion';
import { 
    IconSearch, 
    IconUserCheck, 
    IconCreditCard, 
    IconPackages 
} from '@tabler/icons-react';

const steps = [
    { 
        icon: IconSearch, 
        title: 'Discover', 
        desc: 'Browse our curated list of high-growth pre-IPO companies and research reports.', 
        color: 'bg-blue-50 text-blue-600' 
    },
    { 
        icon: IconUserCheck, 
        title: 'KYC & Verification', 
        desc: 'Complete your profile with digital KYC. It takes less than 2 minutes.', 
        color: 'bg-indigo-50 text-indigo-600' 
    },
    { 
        icon: IconCreditCard, 
        title: 'Invest', 
        desc: 'Transfer funds securely via ESCROW or direct banking channels.', 
        color: 'bg-teal-50 text-teal-600' 
    },
    { 
        icon: IconPackages, 
        title: 'Demat Transfer', 
        desc: 'Shares are transferred to your Demat account within 24-48 hours.', 
        color: 'bg-sky-50 text-sky-600' 
    },
];

export default function InvestmentProcess() {
    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-[1440px] mx-auto px-6">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-[#2076C7] font-black tracking-widest uppercase text-[10px] mb-4 block">
                        Our Workflow
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight">
                        Simple 4-Step Investment Process
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full opacity-30" />
                </motion.div>

                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    
                    {/* Visual Connector Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-10" />
                    
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Icon Container */}
                                <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10 border border-white`}>
                                    <Icon size={38} strokeWidth={1.5} />
                                </div>

                                {/* Step Counter */}
                                <div className="absolute -top-4 -right-2 md:right-8 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-md z-20">
                                    <span className="text-xs font-black text-[#2076C7]">0{i + 1}</span>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-[#2076C7] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm lg:text-base px-2">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}