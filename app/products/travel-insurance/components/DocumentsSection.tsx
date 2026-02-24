'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CreditCard, Plane, BookOpen, ShieldCheck, ChevronDown } from 'lucide-react';

const documentGroups = [
    {
        icon: <BookOpen size={24} />,
        title: 'Identity Documents',
        items: [
            'Valid Passport with minimum 6 months validity from travel date',
            'PAN Card or Aadhaar Card for KYC verification',
            'Recent passport-size photograph (digital or physical)',
        ],
        color: 'from-blue-600 to-teal-500',
    },
    {
        icon: <Plane size={24} />,
        title: 'Travel Documents',
        items: [
            'Confirmed round-trip flight tickets',
            'Valid visa copy for the destination country (if required)',
            'Hotel booking or accommodation proof',
            'Travel itinerary with dates and destinations',
        ],
        color: 'from-teal-600 to-blue-500',
    },
    {
        icon: <FileText size={24} />,
        title: 'Additional for Students',
        items: [
            'Admission/enrollment letter from foreign university',
            'Proof of tuition fee payment or scholarship letter',
            'NOC from sponsor/parent (if applicable)',
        ],
        color: 'from-blue-500 to-blue-700',
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'For Claims',
        items: [
            'Original medical bills and receipts (for medical claims)',
            'FIR/Police report (for theft or loss claims)',
            'Property Irregularity Report from airline (for baggage)',
            'Proof of trip cancellation (airline/hotel confirmation)',
        ],
        color: 'from-teal-500 to-teal-700',
    },
];

export default function DocumentsSection() {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

    return (
        <section id="documents" className="py-12 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Documentation</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-3">Documents You'll Need</h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Keep these documents ready for a smooth application and claims process.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {documentGroups.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <button
                                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white shadow-lg`}>
                                        {group.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
                                    <span className="hidden sm:inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                                        {group.items.length} items
                                    </span>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-slate-400 transition-transform duration-300 ${expandedIdx === idx ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {expandedIdx === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="border-t border-slate-100 pt-4 space-y-3">
                                                {group.items.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.08 }}
                                                        className="flex items-start gap-3 text-slate-600"
                                                    >
                                                        <div className="w-6 h-6 flex-shrink-0 bg-teal-50 text-secondary-teal rounded-full flex items-center justify-center mt-0.5 text-xs font-bold">
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-sm leading-relaxed">{item}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center text-slate-400 text-sm"
                >
                    Note: Additional documents may be required based on the destination country and plan type.
                </motion.p>
            </div>
        </section>
    );
}
