'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconFileText, IconUserCheck, IconBriefcase, IconClock, IconArrowRight, IconInfoCircle, IconCreditCard, IconStar, IconShieldCheck } from '@tabler/icons-react';

const steps = [
    { icon: IconCreditCard, step: '01', title: 'Check Eligibility', desc: 'Provide your basic professional details and income to see which cards you qualify for.', color: 'bg-blue-100 text-blue-600' },
    { icon: IconUserCheck, step: '02', title: 'Video KYC', desc: 'Complete your identity verification instantly via a quick video call with bank officials.', color: 'bg-indigo-100 text-indigo-600' },
    { icon: IconFileText, step: '03', title: 'E-Documentation', desc: 'Virtually sign your application and upload income proof for final bank review.', color: 'bg-teal-100 text-teal-600' },
    { icon: IconClock, step: '04', title: 'Card Issuance', desc: 'Get your virtual card instantly after approval. Physical card delivered in 5-7 days.', color: 'bg-sky-100 text-sky-600' },
];

const eligibility = {
    general: [
        'Age: 21 – 65 (Salaried) / 25 – 70 (Self-employed)',
        'Residency: Resident Indian (Primary) / NRIs (FCNR/NRE backings)',
        'Monthly Income: Min. ₹20,000 (Tier-2) / ₹25,000 (Tier-1)',
        'Credit History: Preferable CIBIL of 700+ for instant approvals',
        'Stability: Min. 1 yr business continuity or 6mo current job',
    ],
    premium: [
        'Annual Income: ₹15 Lakhs+ for Infinia / 18L+ for DCB variants',
        'CIBIL Score: 750+ (Mandatory for metal & invite-only cards)',
        'Portfolio: Active High-Value Liquid Assets or FD backings',
        'Existing Credit: Zero defaults in the last 24-36 months',
        'Global Status: High-Net-Worth Individuals (HNI) & NRIs',
    ],
};

const documentRequirements = [
    {
        title: 'Identity Proof',
        docs: [
            'Aadhaar Card (E-KYC verified)',
            'PAN Card (Original mandatory)',
            'Passport Size Photos (2 copies)',
            'Valid Passport / Voter ID',
            'Live Selfie (Digital capture)'
        ],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Salaried Income',
        docs: [
            'Last 3 Months Salary Slips',
            'Last 6 Months Bank Statements',
            'Latest Form 16 / ITR Copy',
            'Employee ID Card'
        ],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Self-Employed Proof',
        docs: [
            'Last 2 Years ITR with Computation',
            'Business P&L & Balance Sheet',
            'GST Registration Certificate',
            '12 Months Business Bank Statement'
        ],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Address Proof',
        docs: [
            'Latest Utility Bills (< 3 months)',
            'Passport / Voter ID',
            'Bank Statement with Address',
            'Property Tax Receipt'
        ],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
];

export default function EligibilityAndProcess() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-20" >
                         <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            How to Apply for Our Credit Cards
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                          Apply from the comfort of your home with our 100% digital and paperless application journey. 
                        </p>
                     </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-1.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-10" />
                        
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div 
                                    key={step.title} 
                                    initial={{ opacity: 0, y: 30 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ duration: 0.5, delay: i * 0.15 }} 
                                    className="flex flex-col items-center text-center group relative z-10" 
                                >
                                    <div className="relative mb-8">
                                        <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white`}>
                                            <Icon size={32} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#2076C7] mb-3 tracking-tight">{step.title}</h3>
                                    <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-[240px]">{step.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="eligibility" className="py-16 lg:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#1CADA3]/5 to-[#2076C7]/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Your Road to Financial Freedom
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                          Focus on your potential, not just your history. Check if you qualify for a premium credit card today.
                        </p>
                    </motion.div>

                    {/* Concise Two-Panel Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                        {/* Left Panel — Standard Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2076C7]">
                                    <IconCheck size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-800">Standard Eligibility</h3>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {eligibility.general.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.07 }}
                                        className="flex items-center gap-3 py-2.5 px-1 last:border-0 group"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center flex-shrink-0">
                                            <IconCheck size={11} className="text-white" strokeWidth={3} />
                                        </span>
                                        <span className="text-base font-semibold text-slate-700 group-hover:text-[#2076C7] transition-colors">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Right Panel — Premium Criteria */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                                        <IconStar size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-white">Super-Premium Selection</h3>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {eligibility.premium.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.07 }}
                                            className="flex items-center gap-3 py-2.5 px-1 last:border-0"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                                                <IconCheck size={11} className="text-white" strokeWidth={3} />
                                            </span>
                                            <span className="text-base font-semibold text-white/90">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* First-Timer Note Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 mb-16"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white flex-shrink-0">
                            <IconInfoCircle size={16} strokeWidth={2.5} />
                        </div>
                        <p className="text-base font-semibold text-slate-700">
                            <span className="text-[#2076C7] font-extrabold">New to Credit?</span> You can still qualify! Start with entry-level cards or FD-backed options to build your score from zero.
                        </p>
                    </motion.div>

                    {/* Documentation Section - Document Vault Layout */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-center text-center gap-8 mb-16"
                        >
                            <div className="text-center">
                                 <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            The Document Vault
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                          Keep these digital copies ready for a 100% paperless verification process.
                        </p>
                        </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {documentRequirements.map((type, i) => (
                                <motion.div 
                                    key={type.title} 
                                    initial={{ opacity: 0, y: 20 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-slate-50/50 p-6 rounded-[3rem] border-2 hover:border-[#1CADA3]/20 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                                >
                                    <h5 className="font-extrabold text-[#2076C7] text-base mb-2 pb-4 border-b border-slate-100">
                                        {type.title}
                                    </h5>
                                    <ul className="space-y-2 relative z-10">
                                        {type.docs.map((doc, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1CADA3]" />
                                                <span className="text-[12px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{doc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
