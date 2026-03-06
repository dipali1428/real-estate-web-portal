'use client';

import { motion } from 'framer-motion';
import {
    IconCheck,
    IconExternalLink,
    IconBone,
    IconVaccine,
    IconStethoscope,
    IconHeart,
    IconWheelchair,
    IconFeather,
    IconFileDescription,
    IconUpload,
    IconCheckbox,
    IconHeadset,
    IconReceipt,
    IconId,
    IconCertificate,
    IconClipboardText,
    IconDog
} from '@tabler/icons-react';
import { useModal } from '@/app/context/ModalContext';

// --- Section 1: ProviderComparison ---
const providers = [
    {
        name: 'Digit Pet',
        ratio: '97.50%',
        network: '5,000+',
        features: ['OPD & IPD Cover', 'Lost Pet Recovery', 'Worldwide Coverage'],
        color: 'bg-[#2076C7]',
        price: '₹299/*',
    },
    {
        name: 'Bajaj Allianz',
        ratio: '98.20%',
        network: '4,500+',
        features: ['Surgery Benefit', 'Mortality Benefit', 'Terminal Illness'],
        color: 'bg-[#1CADA3]',
        price: '₹350/*',
    },
    {
        name: 'Oriental Ins.',
        ratio: '95.40%',
        network: '3,000+',
        features: ['Traditional Cover', 'Low Premium', 'Death by Accident'],
        color: 'bg-[#2076C7]',
        price: '₹250/*',
    },
    {
        name: 'New India',
        ratio: '96.10%',
        network: '4,000+',
        features: ['Theft/Straying Cover', 'Accidental Injury', 'Poisoning Cover'],
        color: 'bg-[#1CADA3]',
        price: '₹280/*',
    },
];

export function ProviderComparison() {
    const { openPartner } = useModal();
    return (
        <section className="py-12 px-4 sm:px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Market Comparison</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Compare Top Pet Insurers
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                        We've analyzed the leading pet insurance providers in India to help you find the best value for your pet's needs.
                    </p>
                </motion.div>

                <div className="overflow-x-auto pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 custom-scrollbar">
                    <table className="w-full min-w-[800px] border-separate border-spacing-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                        <thead>
                            <tr className="bg-[#1CADA3]/10 text-slate-800">
                                <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-sm md:text-base">Insurer</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Claim Settled</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Vet Network</th>
                                <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-sm md:text-base">Unique Highlights</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Starting At</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {providers.map((provider, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${provider.color} text-white flex items-center justify-center font-bold text-base md:text-lg shadow-md flex-shrink-0`}>
                                                {provider.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900 text-base md:text-lg">{provider.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <div className="inline-block px-3 py-1 bg-[#1CADA3]/10 text-[#1CADA3] font-bold rounded-full text-xs md:text-sm border border-[#1CADA3]/20">
                                            {provider.ratio}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center font-semibold text-slate-700 text-sm md:text-base">
                                        {provider.network}
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <div className="flex flex-col gap-1.5">
                                            {provider.features.slice(0, 2).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-600 whitespace-nowrap">
                                                    <IconCheck size={14} className="text-[#1CADA3] flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <div className="text-lg md:text-xl font-bold text-slate-900">{provider.price}</div>
                                        <div className="text-[10px] md:text-xs text-slate-400">per month</div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <button onClick={openPartner} className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1CADA3] hover:text-white transition-all">
                                            <IconExternalLink size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">Disclaimer: Comparison based on market data for 2024. Payouts and network size vary by plan type and pet profile.</p>
            </div>
        </section>
    );
}

// --- Section 2: PetPlanTypes ---
const plans = [
    {
        icon: IconFeather,
        title: 'Basic Paws',
        tagline: 'Essential Health Cover',
        desc: 'Covers major accidents and basic illnesses. Perfect for young, healthy pets starting their insurance journey.',
        features: ['Accident Cover up to ₹75k', 'Major Illness Support', 'Emergency Vet Consultation', 'Third Party Liability'],
        price: '₹299',
        duration: 'per month',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconVaccine,
        title: 'Plus Care',
        tagline: 'Balanced Protection',
        desc: 'Comprehensive coverage including surgeries and hospitalization. Our most popular choice for adult pets.',
        features: ['Accident Cover up to ₹2L', 'Surgery & Hospitalization', 'OPD & Diagnostic Tests', 'Lost Pet Recovery'],
        price: '₹599',
        duration: 'per month',
        popular: true,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconHeart,
        title: 'Premium Shield',
        tagline: 'Full Wellness Support',
        desc: 'All-inclusive plan with wellness benefits, routine checkups, and dental care. Total peace of mind for pet parents.',
        features: ['Accident Cover up to ₹5L', 'Wellness & Vaccinations', 'Chronic Condition Cover', 'OPD & Behavioral Care'],
        price: '₹999',
        duration: 'per month',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconWheelchair,
        title: 'Senior Support',
        tagline: 'Special Care for Seniors',
        desc: 'Specially designed for pets aged 7+. Focuses on aging-related conditions and long-term medication support.',
        features: ['Joint & Bone Disorders', 'Senior Health Screening', 'Long-term Meds Benefit', 'Palliative Care Cover'],
        price: '₹799',
        duration: 'per month',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
];

export function PetPlanTypes() {
    const { openPartner } = useModal();

    return (
        <section id="plans" className="py-12 px-4 sm:px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-12 gap-6 mx-auto"
                >
                    <div className="max-w-3xl">
                        <span className="text-[#2076C7] font-bold tracking-widest uppercase text-sm">Pet Plans</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Tailored plans for Your Pet's Life
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                            Choose the perfect plan for your furry family member. Each plan comes with 24/7 support and easy online claims.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-white hover:border-blue-400 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(32,118,199,0.15)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.25)] flex flex-col h-full"
                        >
                            <div className="p-5 sm:p-8 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                                        <plan.icon size={28} />
                                    </div>
                                    {plan.popular && (
                                        <span className="text-[10px] font-black underline decoration-2 underline-offset-4 text-grey-600 uppercase tracking-widest">
                                            (Most Popular)
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl md:text-2xl font-extrabold text-[#1CADA3] text-center sm:text-left">{plan.title}</h3>
                                <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 text-center sm:text-left">{plan.tagline}</p>
                                <p className="text-sm text-slate-600 mt-4 leading-relaxed min-h-[60px] text-center sm:text-left">{plan.desc}</p>

                                <div className="mt-6 border-t border-slate-100 pt-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                                        <span className="text-sm text-slate-400 font-medium">/{plan.duration}</span>
                                    </div>
                                </div>

                                <ul className="mt-6 space-y-3 flex-grow">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-5 h-5 bg-teal-50 text-[#1CADA3] rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M8.5 2.5L4 7.5L1.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={openPartner}
                                    className={`mt-8 w-full block text-center py-3.5 rounded-xl font-bold transition-all ${plan.popular
                                        ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                        : 'bg-slate-100 text-slate-700 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] hover:text-white'
                                        }`}
                                >
                                    Start your application
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Section 3: PetClaimsProcess ---
const claimSteps = [
    {
        icon: IconStethoscope,
        title: 'Visit the Vet',
        desc: 'Take your pet to any licensed veterinarian for treatment or consultation.',
        gradient: 'from-[#2076C7] to-[#1CADA3]',
        shadow: 'shadow-[#2076C7]/30',
        ring: 'ring-[#2076C7]/20',
    },
    {
        icon: IconReceipt,
        title: 'Pay & Collect Bills',
        desc: 'Pay the bills upfront and collect all medical reports and original invoices.',
        gradient: 'from-[#2076C7] to-[#2076C7]/60',
        shadow: 'shadow-[#2076C7]/20',
        ring: 'ring-[#2076C7]/10',
    },
    {
        icon: IconUpload,
        title: 'Upload to Portal',
        desc: 'Submit your claim digitally through our portal with all required documents.',
        gradient: 'from-[#1CADA3] to-[#1CADA3]/70',
        shadow: 'shadow-[#1CADA3]/30',
        ring: 'ring-[#1CADA3]/20',
    },
    {
        icon: IconCheckbox,
        title: 'Get Reimbursed',
        desc: 'Approved amounts are credited back to your bank account within 2-3 days.',
        gradient: 'from-[#2076C7] to-[#2076C7]/80',
        shadow: 'shadow-[#2076C7]/20',
        ring: 'ring-[#2076C7]/10',
    }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 12,
            duration: 0.6,
        },
    },
};

const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 200,
            damping: 15,
            delay: 0.2,
        },
    },
};

const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            duration: 1.2,
            ease: 'easeInOut' as const,
        },
    },
};

export function PetClaimsProcess() {
    const { openPartner } = useModal();
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Reimbursement Made Easy</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Simple 4-Step Claims Process
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto px-4 md:px-0">
                        We know vet emergencies are stressful. Our digital-first claims process ensures you get your money back as fast as possible.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative"
                >
                    {/* Animated Connecting Line (Desktop) */}
                    <motion.div
                        variants={lineVariants}
                        className="hidden md:block absolute top-16 left-[12%] right-[12%] h-1 bg-gradient-to-r from-[#2076C7] via-[#2076C7] to-[#1CADA3] rounded-full origin-left"
                        style={{ zIndex: 0 }}
                    />

                    {claimSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                transition: { type: 'spring', stiffness: 300, damping: 15 },
                            }}
                            className="flex flex-col items-center text-center group cursor-pointer relative z-10"
                        >
                            {/* Animated Icon Circle */}
                            <motion.div
                                variants={iconVariants}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, -5, 5, -5, 0],
                                    transition: { duration: 0.5 },
                                }}
                                className={`w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mb-6 shadow-xl ${step.shadow} relative`}
                            >
                                {/* Animated Pulse Ring */}
                                <span className={`absolute inset-0 rounded-full ring-4 ${step.ring} animate-ping opacity-20`} />
                                {/* Soft Glow Ring */}
                                <span className={`absolute -inset-1 rounded-full ring-2 ${step.ring} opacity-40`} />

                                <step.icon size={32} className="text-white drop-shadow-lg sm:hidden" strokeWidth={1.8} />
                                <step.icon size={44} className="text-white drop-shadow-lg hidden sm:block" strokeWidth={1.8} />

                                {/* Step Number Badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, delay: 0.4 + index * 0.15 }}
                                    className="absolute -top-1 -right-1 w-9 h-9 bg-white text-slate-900 rounded-full flex items-center justify-center font-extrabold text-sm shadow-lg border-2 border-slate-100"
                                >
                                    {index + 1}
                                </motion.div>
                            </motion.div>

                            {/* Title with hover color */}
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2076C7] group-hover:to-[#1CADA3] transition-all duration-300">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm px-4">
                                {step.desc}
                            </p>

                            {/* Decorative dot animation on hover */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '40px' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + index * 0.15, duration: 0.4 }}
                                className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mt-4 group-hover:w-16 transition-all duration-300`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        onClick={openPartner}
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(32,118,199,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-lg transition-all text-sm md:text-base"
                    >
                        Notify a New Claim
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}

// --- Section 4: PetDocumentsSection ---
const documentRequirements = [
    {
        category: 'Pet Identification',
        icon: IconDog,
        docs: [
            'Recent clear photograph of the pet',
            'Microchip ID details (if applicable)',
            'Breed certificate (for purebreds)',
            'Birth certificate or Age proof',
        ]
    },
    {
        category: 'Medical Records',
        icon: IconVaccine,
        docs: [
            'Up-to-date Vaccination records',
            'Health certificate from a vet',
            'De-worming history',
            'Previous medical history (if any)',
        ]
    },
    {
        category: 'Owner Details',
        icon: IconId,
        docs: [
            'KYC Documents of the owner',
            'Aadhar Card / Voter ID / Passport',
            'Address Proof',
            'Mobile number linked with bank',
        ]
    },
    {
        category: 'Claim Documents',
        icon: IconClipboardText,
        docs: [
            'Original prescriptions from vet',
            'Hospital bills & lab reports',
            'Diagnostic test results',
            'Duly filled claim form',
        ]
    }
];

export function PetDocumentsSection() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Requirements</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Documents Checklist
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                        Keep these documents handy for a smooth application and fast claim settlement experience.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {documentRequirements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-5 sm:p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-[#1CADA3]/30 transition-all duration-300 group shadow-sm hover:shadow-md text-center sm:text-left"
                        >
                            <div className="flex items-center justify-center sm:justify-start gap-4 mb-5 sm:mb-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#2076C7] shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-50 flex-shrink-0">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 text-left">{item.category}</h3>
                            </div>
                            <ul className="space-y-3">
                                {item.docs.map((doc, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 flex-shrink-0" />
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
