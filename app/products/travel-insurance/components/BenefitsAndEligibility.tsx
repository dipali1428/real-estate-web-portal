'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconCheck, IconAmbulance, IconPlane, IconId, IconHeadset, IconChevronDown, IconUser, IconCalendar, IconGlobe, IconHeart, IconFileText } from '@tabler/icons-react';
import { BookOpen, Plane, ShieldCheck, FileText } from 'lucide-react';
import WaveDivider from './WaveDivider';

// --- Benefits Data ---
const benefits = [
    { title: 'Global Medical Cover', desc: 'Up to $1 Million coverage for illnesses and sudden accidents abroad.', icon: IconAmbulance, color: 'from-[#2076C7] to-[#1CADA3] ' },
    { title: 'Trip Cancellation', desc: 'Reimbursement for non-refundable expenses if your plans change.', icon: IconPlane, color: 'from-[#1CADA3] to-[#2076C7]' },
    { title: 'Lost Baggage', desc: 'Secure payouts for total loss or theft of your checked-in baggage.', icon: IconId, color: 'from-[#1CADA3] to-[#2076C7]' },
    { title: 'Emergency Cash', desc: 'Immediate financial aid for travelers stranded due to theft or loss.', icon: IconHeadset, color: 'from-[#1CADA3] to-[#2076C7]' }
];

// --- Eligibility Data ---
const requirements = [
    'Indian passport holders', 'Traveler age: 6 mo - 70 yr', 'Trip duration: Up to 180 days',
    'Domestic and international', 'Leisure, business, study', 'Generally healthy travelers',
];

// --- Detailed Eligibility Criteria ---
const eligibilityCriteria = [
    {
        icon: IconUser,
        title: 'Age Requirements',
        points: ['Minimum age: 6 months', 'Maximum age: 70 years (standard plans)', 'Senior plans available up to 85 years with specific terms'],
    },
    {
        icon: IconCalendar,
        title: 'Trip Duration',
        points: ['Single trip: 1 to 180 days', 'Annual multi-trip: up to 45 days per trip', 'Policy must be bought before departure'],
    },
    {
        icon: IconGlobe,
        title: 'Travel Purpose',
        points: ['Leisure & tourism trips', 'Business travel', 'Study abroad programs', 'Adventure and sports travel (add-on)'],
    },
    {
        icon: IconHeart,
        title: 'Health & Medical',
        points: ['Generally healthy travelers', 'Stable pre-existing conditions may be covered', 'Medical declaration required for pre-existing conditions'],
    },
    {
        icon: IconFileText,
        title: 'Documents Required',
        points: ['Valid Indian passport', 'Confirmed travel itinerary', 'Visa copy (if applicable)', 'Medical reports (for senior plans)'],
    },
];

// --- Documents Data ---
const documentGroups = [
    { icon: <BookOpen size={24} />, title: 'Identity Documents', items: ['Passport (6 mo validity)', 'PAN/Aadhaar Card', 'Recent Photograph'], color: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: <Plane size={24} />, title: 'Travel Documents', items: ['Flight tickets', 'Visa copy', 'Hotel booking', 'Itinerary'], color: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: <FileText size={24} />, title: 'Student Files', items: ['Enrollment letter', 'Fee payment proof', 'NOC from sponsor'], color: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: <ShieldCheck size={24} />, title: 'For Claims', items: ['Medical bills', 'Police report (theft)', 'Airline PIR', 'Cancellation proof'], color: 'from-[#1CADA3] to-[#2076C7]' },
];

export default function BenefitsAndEligibility() {
    const [showEligibility, setShowEligibility] = useState(false);
    const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

    return (
        <>
            {/* --- WHY CHOOSE US (BENEFITS) --- */}
            <section className="py-16 bg-white overflow-hidden relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-10 -right-20 w-80 h-80 bg-[#1CADA3]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#2076C7]/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                Why Choose Our Travel Insurance?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                                We offer more than just coverage — we provide peace of mind for your global adventures with tailor-made plans.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#1CADA3] drop-shadow-sm tracking-tight leading-tight">
                                Who Can Apply?
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {benefits.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border border-slate-100 group flex flex-col items-center"
                                >
                                    <div className="p-4 rounded-2xl bg-white shadow-md mb-4 group-hover:scale-110 transition-transform flex items-center justify-center">
                                        <b.icon size={32} stroke={2} className="text-[#2076C7]" />
                                    </div>
                                    <h4 className="text-base font-black text-gray-600 mb-2">{b.title}</h4>
                                    <p className="text-[13px] text-gray-500 font-medium leading-tight">{b.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <WaveDivider />
            </section>

            {/* --- ELIGIBILITY CHECKLIST --- */}
            <section className="py-16 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border-2 border-[#2076C7]/30">
                    <div className="lg:w-1/2 p-8 sm:p-10 lg:p-12">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block mb-6">Quick Checklist</h3>
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                            {requirements.map((req, i) => (
                                <div key={i} className="flex items-start gap-3"><div className="bg-[#2076C7]/10 text-[#2076C7] p-1.5 rounded-full shrink-0"><IconCheck size={16} stroke={3} /></div><span className="text-gray-700 text-base font-semibold">{req}</span></div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowEligibility(!showEligibility)}
                            className="bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm md:text-base shadow-lg hover:scale-[1.02] transition-all w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            {showEligibility ? 'Hide Criteria' : 'Check Eligibility & Documents'}
                            <IconChevronDown
                                size={18}
                                strokeWidth={3}
                                className={`transition-transform duration-300 ${showEligibility ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    <div className="lg:w-1/2 bg-[#2076C7]/5 p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block mb-6">Protected Everywhere</h3>
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div><div className="text-4xl font-black text-[#2076C7]">195+</div><div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Countries</div></div>
                            <div><div className="text-4xl font-black text-[#1CADA3]">50k+</div><div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctors</div></div>
                        </div>
                        <div className="flex flex-wrap gap-2">{['USA', 'UK', 'Schengen', 'UAE'].map((c, i) => <span key={i} className="px-4 py-1.5 bg-white rounded-full text-xs font-black text-[#2076C7] border border-[#2076C7]/20">{c}</span>)}</div>
                    </div>
                </div>

                {/* --- EXPANDED ELIGIBILITY CRITERIA PANEL --- */}
                <AnimatePresence>
                    {showEligibility && (
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="max-w-7xl mx-auto mt-6"
                        >
                            <div className="rounded-[3rem] border-2 border-[#2076C7]/20 bg-white shadow-xl overflow-hidden">
                                <div className="px-10 pt-10 pb-4">
                                    <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block mb-1">
                                        Eligibility Criteria
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium mb-8">Detailed requirements to qualify for travel insurance coverage.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 border-t border-slate-100">
                                    {eligibilityCriteria.map((crit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            className="p-8 lg:p-10 flex flex-col gap-5 border-b sm:border-b-0 sm:border-r border-slate-100 last:border-0"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1CADA3] to-[#2076C7] flex items-center justify-center text-white shadow-lg shrink-0">
                                                <crit.icon size={28} />
                                            </div>
                                            <h4 className="font-black text-gray-800 text-base leading-tight">{crit.title}</h4>
                                            <ul className="space-y-3">
                                                {crit.points.map((pt, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-gray-500 text-sm font-medium leading-snug">
                                                        <span className="text-[#1CADA3] mt-0.5 shrink-0 font-black">•</span>
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* --- DOCUMENTS SUB-SECTION (NOW INSIDE ELIGIBILITY) --- */}
                                <div className="mt-0 border-t border-slate-100 p-8 sm:p-10 lg:p-12 bg-slate-50/50">
                                    <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block mb-2">
                                        Documents You'll Need
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium mb-8">Required files for a smooth, hassle-free process.</p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {documentGroups.map((g, i) => (
                                            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all p-6 py-7">
                                                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-50">
                                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white shadow-md`}>{g.icon}</div>
                                                    <h3 className="text-base font-black text-gray-700 tracking-tight">{g.title}</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    {g.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                                            <span className="w-5 h-5 bg-[#2076C7]/10 text-[#2076C7] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 font-mono italic">{idx + 1}</span>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}
