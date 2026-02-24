'use client';

import { motion } from 'framer-motion';
import { IconFileDescription, IconUpload, IconCheckbox, IconHeadset } from '@tabler/icons-react';
import { useModal } from '@/app/context/ModalContext';

const steps = [
    {
        icon: IconFileDescription,
        title: 'Report Incident',
        desc: 'Notify us efficiently via app or hotline within 24 hours of the incident.',
        gradient: 'from-blue-500 to-cyan-400',
        shadow: 'shadow-blue-500/30',
        ring: 'ring-blue-200',
    },
    {
        icon: IconUpload,
        title: 'Upload Documents',
        desc: 'Submit photos, receipts, and reports through our secure digital portal.',
        gradient: 'from-blue-600 to-blue-400',
        shadow: 'shadow-blue-500/20',
        ring: 'ring-blue-100',
    },
    {
        icon: IconCheckbox,
        title: 'Claim Review',
        desc: 'Our experts verify your claim within 48 hours for fast processing.',
        gradient: 'from-teal-500 to-emerald-400',
        shadow: 'shadow-teal-500/30',
        ring: 'ring-teal-200',
    },
    {
        icon: IconHeadset,
        title: 'Settlement',
        desc: 'Approved claims are paid out directly to your bank account instantly.',
        gradient: 'from-blue-700 to-blue-500',
        shadow: 'shadow-blue-600/20',
        ring: 'ring-blue-100',
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

export default function ClaimsProcess() {
    const { openPartner } = useModal();
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Hassle-Free Experience</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mt-3">
                        Simple 4-Step Claims Process
                    </h2>
                    <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                        We know that filing a claim can be stressful. That&apos;s why we&apos;ve made our process digital, transparent, and incredibly fast.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid md:grid-cols-4 gap-8 relative"
                >
                    {/* Animated Connecting Line (Desktop) */}
                    <motion.div
                        variants={lineVariants}
                        className="hidden md:block absolute top-16 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-teal-400 rounded-full origin-left"
                        style={{ zIndex: 0 }}
                    />

                    {steps.map((step, index) => (
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
                                className={`w-28 h-28 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mb-6 shadow-xl ${step.shadow} relative`}
                            >
                                {/* Animated Pulse Ring */}
                                <span className={`absolute inset-0 rounded-full ring-4 ${step.ring} animate-ping opacity-20`} />
                                {/* Soft Glow Ring */}
                                <span className={`absolute -inset-1 rounded-full ring-2 ${step.ring} opacity-40`} />

                                <step.icon size={44} className="text-white drop-shadow-lg" strokeWidth={1.8} />

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
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
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
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
                    >
                        Start a Claim Notification
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
