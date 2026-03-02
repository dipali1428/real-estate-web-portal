'use client';

import { motion } from 'framer-motion';
import {
    IconAmbulance,
    IconStethoscope,
    IconFirstAidKit,
    IconHeartRateMonitor,
    IconClipboardCheck,
    IconSearch,
    IconShieldCheck,
    IconArrowRight,
    IconClock,
    IconActivity,
    IconCheck,
    IconDog,
    IconCat,
    IconAward,
    IconFeather,
    IconPaw,
    IconFish
} from '@tabler/icons-react';

// --- Internal Helper: WaveDivider ---
function WaveDivider() {
    return <div className="w-full h-px bg-slate-200 mt-8" />;
}

// --- Section 1: PetInsuranceOverview (merged: NeedOfPetInsurance + PetTypesSection) ---
const coverageItems = [
    {
        title: 'Accidental Injuries',
        icon: IconFirstAidKit,
        highlight: 'Immediate Care',
        items: [
            'Fractures & bone injuries',
            'Bite wounds & lacerations',
            'Poisoning emergencies',
            'Foreign object ingestion',
            'Emergency vet visits',
        ],
    },
    {
        title: 'Illness Protection',
        icon: IconStethoscope,
        description: 'Comprehensive medical care for your pets.',
        items: [
            'Infectious diseases',
            'Digestive issues',
            'Skin allergies & infections',
            'Cancer & major illnesses',
            'Diagnostic tests & labs',
        ],
    },
    {
        title: 'Surgery & Hospitalization',
        icon: IconAmbulance,
        description: 'Critical support during major procedures.',
        items: [
            'Soft tissue surgeries',
            'Orthopedic procedures',
            'Post-op care & meds',
            'In-patient hospital stays',
            'Specialist consultations',
        ],
    },
    {
        title: 'Wellness & Preventive',
        icon: IconHeartRateMonitor,
        description: 'Keeping your pet healthy every day.',
        items: [
            'Annual vaccinations',
            'General health checkups',
            'De-worming treatments',
            'Tick & flea prevention',
            'Nutritional advice',
        ],
    },
];

const petCategories = [
    {
        title: 'Dogs',
        icon: IconDog,
        gradient: 'from-[#2076C7] to-[#2076C7]/70',
        borderColor: 'border-[#2076C7]/20 hover:border-[#2076C7]',
        subtypes: [
            'All breeds (Pedigree & Mixed)',
            'Indian breeds (Rajapalayam, Mudhol, etc.)',
            'Foreign breeds (Labrador, GSD, etc.)',
            'Age limits: ~2 months to ~8 years',
        ],
        note: 'Most widely covered pet category across all insurers.',
    },
    {
        title: 'Cats',
        icon: IconCat,
        gradient: 'from-[#1CADA3] to-[#1CADA3]/70',
        borderColor: 'border-[#1CADA3]/20 hover:border-[#1CADA3]',
        subtypes: [
            'Pedigree cats (Persian, Siamese, etc.)',
            'Mixed-breed cats',
            'Indoor cats',
            'Outdoor cats',
        ],
        note: 'Growing coverage options with most major insurers.',
    },
    {
        title: 'Birds',
        icon: IconFeather,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
        borderColor: 'border-[#2076C7]/20 hover:border-[#2076C7]',
        subtypes: [
            'Parrots',
            'Cockatiels',
            'Lovebirds',
            'Macaws',
        ],
        note: 'Limited support — special/exotic plans may be required.',
    },
    {
        emoji: '',
        title: 'Exotic Pets',
        icon: IconPaw,
        gradient: 'from-[#1CADA3] to-[#2076C7]',
        borderColor: 'border-[#1CADA3]/20 hover:border-[#1CADA3]',
        subtypes: [
            'Rabbits',
            'Guinea Pigs',
            'Hamsters',
            'Turtles',
        ],
        note: 'Rare coverage — check with specific insurers for availability.',
    },
];

export function PetInsuranceOverview() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-10"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Pet Parent Essentials</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm leading-tight px-2">
                        Why You Need Pet Insurance <br className="hidden md:block" /> & Pets We Insure
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                        Explore what's covered and which pets are eligible — all in one place.
                    </p>
                </motion.div>

                {/* Two-Column Layout with Single Scrollbar */}
                <div className="max-h-none lg:max-h-[600px] overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-4 scrollbar-thin scrollbar-thumb-[#2076C7]/30 scrollbar-track-transparent py-4">
                    <div className="grid lg:grid-cols-2 gap-x-4 gap-y-6 max-w-5xl mx-auto">

                        {/* LEFT: Why You Need Pet Insurance */}
                        <div className="flex flex-col items-center lg:items-end gap-6 w-full h-fit">
                            {coverageItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_-8px_rgba(32,118,199,0.1)] hover:shadow-[0_16px_40px_-10px_rgba(32,118,199,0.2)] transition-all duration-500 border-2 border-[#2076C7]/10 hover:border-[#2076C7] group w-full max-w-[420px]"
                                >
                                    <div className="flex flex-col items-center justify-center gap-1 mb-2 text-center">
                                        <div className="w-10 h-10 rounded-xl bg-[#2076C7]/10 text-[#2076C7] flex items-center justify-center shadow-sm border border-[#2076C7]/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <item.icon size={20} />
                                        </div>
                                        <h4 className="text-base font-black text-slate-900 leading-tight">{item.title}</h4>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <ul className="space-y-2 pl-0 flex flex-col items-center w-full">
                                            {item.items.map((subItem, i) => (
                                                <li key={i} className="flex flex-col lg:flex-row items-center justify-center gap-2 text-slate-600 text-[12px] font-medium leading-relaxed text-center w-full lg:w-auto">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(28,173,163,0.4)] block" />
                                                    <span>{subItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {item.description && (
                                        <p className="text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-3 mt-4 text-center">
                                            {item.description}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT: Pets We Insure */}
                        <div className="flex flex-col items-center lg:items-start gap-6 w-full h-fit">
                            {petCategories.map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className={`rounded-2xl border-2 ${cat.borderColor} bg-white transition-all duration-500 shadow-[0_8px_24px_-8px_rgba(32,118,199,0.1)] hover:shadow-[0_16px_40px_-10px_rgba(32,118,199,0.2)] group overflow-hidden w-full max-w-[420px]`}
                                >
                                    {/* Gradient Header */}
                                    <div className={`bg-gradient-to-r ${cat.gradient} px-5 py-2 flex flex-col items-center justify-center gap-1 text-center`}>
                                        <div className="w-12 h-12 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <cat.icon size={26} className="lg:w-[22px] lg:h-[22px]" />
                                        </div>
                                        <div className="flex flex-row items-center gap-1 lg:gap-2">
                                            <span className="text-2xl lg:text-xl">{cat.emoji}</span>
                                            <h4 className="text-xl lg:text-lg font-black text-white leading-tight">{cat.title}</h4>
                                        </div>
                                    </div>
                                    {/* Subtypes */}
                                    <div className="px-5 py-5 flex flex-col items-center text-center">
                                        <div className="w-full flex justify-center">
                                            <ul className="space-y-3 flex flex-col items-center w-full">
                                                {cat.subtypes.map((sub, i) => (
                                                    <li key={i} className="flex flex-col lg:flex-row items-center justify-center gap-2 text-sm text-slate-700 font-medium text-center w-full lg:w-auto">
                                                        <div className="mt-0.5 flex-shrink-0 block">
                                                            <IconCheck size={14} className="text-[#1CADA3]" stroke={3} />
                                                        </div>
                                                        <span>{sub}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold italic mt-4 pt-3 border-t border-slate-100 w-full text-center">
                                            {cat.note}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Section 2: HowItWorks ---
const steps = [
    {
        icon: IconClipboardCheck,
        title: 'Tell us about your pet',
        desc: 'Enter basic details like pet type, breed, and age to get started.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        icon: IconSearch,
        title: 'Compare & Choose',
        desc: 'Review customized plans from top insurers and pick the best fit.',
        color: 'text-teal-600',
        bg: 'bg-teal-50',
    },
    {
        icon: IconShieldCheck,
        title: 'Get Protected',
        desc: 'Complete the process and enjoy instant coverage for your furry friend.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
];

export function HowItWorks() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Simple 3-Step Protection
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        Getting your pet insured is faster and easier than ever. Follow our simple process to get started.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28%] left-[20%] right-[20%] h-0.5 bg-dashed border-t-2 border-dashed border-slate-100 -z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 flex flex-col items-center group"
                        >
                            <div className={`w-20 h-20 rounded-[2rem] ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon size={36} stroke={2} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                                {step.desc}
                            </p>
                            {idx < steps.length - 1 && (
                                <IconArrowRight className="hidden md:block absolute -right-4 top-[28%] text-slate-200" size={24} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Section 3: WhyPetInsurance ---
const benefits = [
    {
        title: 'Instant Policy Issuance',
        desc: 'Get your pet insured digitally in minutes. No complex medical checkups for young pets.',
        icon: IconClock,
        color: 'text-[#2076C7]',
    },
    {
        title: 'Cashless Treatments',
        desc: 'Access our network of 5,000+ vet clinics for cashless hospitalization and surgery.',
        icon: IconShieldCheck,
        color: 'text-[#1CADA3]',
    },
    {
        title: 'Comprehensive OPD',
        desc: 'Coverage for routine consultations, vaccinations, and diagnostic tests.',
        icon: IconStethoscope,
        color: 'text-[#2076C7]',
    },
    {
        title: 'Lost Pet Support',
        desc: 'Assistance for recovery costs and advertising if your furry friend goes missing.',
        icon: IconActivity,
        color: 'text-[#1CADA3]',
    }
];
// --- Section 4: PetEligibility ---
const requirements = [
    'All domesticated pets (Dogs, Cats, birds, etc.)',
    'Age: 8 weeks to 10 years at entry',
    'Pet must be in good health at inception',
    'Properly vaccinated as per vet guidelines',
    'Valid identification (Photo/Microchip)',
    'Resident of India (Owner)',
];

export function PetEligibility() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-0 bg-white">
            <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(32,118,199,0.2)] flex flex-col lg:flex-row border border-slate-100 bg-white">

                {/* Left Side: Eligibility Checklist */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Who can apply?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm leading-tight">
                        Pet Eligibility Checklist
                    </h2>
                    <p className="text-slate-500 font-medium mb-8">Before you start, make sure your furry friend meets these basic requirements.</p>

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
                                <div className="bg-[#1CADA3]/10 text-[#1CADA3] p-1 rounded-full mt-0.5 flex-shrink-0">
                                    <IconCheck size={16} stroke={3} />
                                </div>
                                <span className="text-slate-600 font-bold leading-relaxed">{req}</span>
                            </motion.div>
                        ))}
                    </div>

                    <a href="#calculator" className="inline-flex items-center justify-center bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-4 rounded-xl font-black hover:shadow-lg hover:shadow-blue-500/30 w-full md:w-auto transition-all shadow-md">
                        Start Your Application
                    </a>
                </motion.div>

                {/* Right Side: Visual/Trust Element */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 bg-blue-50/50 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center text-center items-center"
                >
                    <div className="relative z-10 w-full">
                        <div className="flex justify-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-[#2076C7]">
                                <IconDog size={40} />
                            </div>
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-[#1CADA3]">
                                <IconCat size={40} />
                            </div>
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-[#2076C7]">
                                <IconFeather size={40} />
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">
                            Recognized by India's Top Vets
                        </h2>
                        <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium max-w-sm mx-auto">
                            We work closely with veterinary associations to ensure our coverage meets the actual health needs of pets in India.
                        </p>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 text-left max-w-sm mx-auto">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-[#1CADA3] flex-shrink-0">
                                <IconAward size={28} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 leading-tight">CERTIFIED PROTECTION</p>
                                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">Standardized Pet Care Insurance</p>
                            </div>
                        </div>
                    </div>

                    {/* Background Swirls */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-[100px] -z-0" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[100px] -z-0" />
                </motion.div>

            </div>
        </section>
    );
}

