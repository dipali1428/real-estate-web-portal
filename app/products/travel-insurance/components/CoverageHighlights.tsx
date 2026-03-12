'use client';

import { motion } from 'framer-motion';
import { IconAmbulance, IconPlaneDeparture, IconWorld, IconHeadset, IconCheck } from '@tabler/icons-react';
import WaveDivider from './WaveDivider';

const coverageItems = [
    {
        title: 'Medical Emergency',
        icon: IconAmbulance,
        highlight: 'Primary Coverage',
        items: [
            'Medical emergency coverage abroad',
            'Emergency medical evacuation',
            'Repatriation of remains',
            'Hospitalization expenses'
        ],
        gradient: 'from-[#1CADA3] to-[#2076C7]'
    },
    {
        title: 'Trip Assistance',
        icon: IconPlaneDeparture,
        highlight: 'Travel Protection',
        items: [
            'Total loss of checked-in baggage',
            'Trip delay or cancellation',
            'Loss of passport or IDs',
            'Emergency travel assistance'
        ],
        gradient: 'from-[#1CADA3] to-[#2076C7]'
    },
    {
        title: 'Personal Liability',
        icon: IconWorld,
        highlight: 'Legal Cover',
        items: [
            'Third-party liability abroad',
            'Accidental death & disability',
            'Financial loss protection',
            'Legal assistance expenses'
        ],
        gradient: 'from-[#1CADA3] to-[#2076C7]'
    },
    {
        title: 'Global Support',
        icon: IconHeadset,
        highlight: '24/7 Help',
        items: [
            'Worldwide concierge services',
            'Cashless medical services',
            'Direct claim settlement',
            'Multi-lingual assistance'
        ],
        gradient: 'from-[#1CADA3] to-[#2076C7]'
    }
];

export default function CoverageHighlights() {
    return (
        <section className="py-16 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                        Key Coverage Highlights
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-3 opacity-30" />
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed mt-4">Essential protection for medical emergencies, trip delays, and document loss.</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coverageItems.map((item, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col items-center text-center relative overflow-hidden">
                            <div className="p-4 rounded-2xl bg-white shadow-md mb-6 group-hover:scale-110 transition-transform flex items-center justify-center w-16 h-16 shrink-0 mx-auto">
                                <item.icon size={40} stroke={2} className="text-[#2076C7]" />
                            </div>

                            <h3 className="text-xl font-black text-gray-700 mb-4 leading-tight">{item.title}</h3>

                            <ul className="space-y-3 mb-6 flex-grow flex flex-col items-start">
                                {item.items.slice(0, 4).map((subItem, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm font-medium leading-tight">
                                        <IconCheck size={14} className="text-[#1CADA3] mt-0.5 shrink-0" strokeWidth={3} />
                                        <span>{subItem}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
            <WaveDivider />
        </section>
    );
}
