import { motion } from 'framer-motion';
import { IconAmbulance, IconPlaneDeparture, IconLuggage, IconId } from '@tabler/icons-react';
import Image from 'next/image';
import WaveDivider from './WaveDivider';

const coverageItems = [
    {
        title: 'Medical Emergency',
        icon: IconAmbulance,
        highlight: 'Primary Coverage',
        items: [
            'Medical emergency coverage abroad',
            'Emergency medical evacuation',
            'Hospitalization expenses',
            'Doctor consultations & surgery',
            '24/7 travel assistance',
        ],
        // Image: Doctor Consultation (Medical Emergency)
        image: '/travel insurance/medical1.jfif',
    },
    {
        title: 'Trip Cancellation / Delay',
        icon: IconPlaneDeparture,
        description: 'Protection for your non-refundable trip investments.',
        items: [
            'Trip cancellation & interruption',
            'Flight delay compensation',
            'Missed connections coverage',
            'Itinerary change assistance',
        ],
        // Image: Airport Board (Trip Cancellation)
        image: '/travel insurance/cancellation.png',
    },
    {
        title: 'Lost or Delayed Baggage',
        icon: IconLuggage,
        description: 'Security for your personal effects and baggage.',
        items: [
            'Lost or stolen baggage recovery',
            'Baggage delay compensation',
            'Loss of personal documents',
            'Essential items reimbursement',
        ],
        // Image: Traveler with backpack (Baggage)
        image: '/travel insurance/luggage1.webp',
    },
    {
        title: 'Passport Loss',
        icon: IconId,
        description: '24/7 emergency assistance for your identity documents.',
        items: [
            'Covers cost of new passport',
            'Emergency documentation support',
            'Legal assistance abroad',
            'Personal accident cover (in many plans)',
        ],
        // Image: Passport (Passport Loss)
        image: '/travel insurance/passport.png',
    },
];

export default function KeyCoverageHighlights() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Essential Protection</span>
                     <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                              Why You Need Travel Insurance
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                        Comprehensive coverage for the unexpected, ensuring your journey remains worry-free.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coverageItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(32,118,199,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.25)] transition-all duration-500 border-2 border-[#2076C7]/10 hover:border-[#2076C7] group flex flex-col relative"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2076C7]/0 to-[#2076C7]/0 group-hover:from-[#2076C7]/5 group-hover:to-[#2076C7]/5 transition-colors duration-500 -z-1" />

                            {/* Image Section */}
                            <div className="relative h-40 md:h-48 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[#2076C7]/10 group-hover:bg-[#2076C7]/0 transition-colors duration-300" />
                            </div>

                            <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                {/* Header: Logo and Heading */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#2076C7]/10 text-[#2076C7] flex items-center justify-center shadow-sm border border-[#2076C7]/20 flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-[#1CADA3] leading-tight">{item.title}</h3>
                                </div>

                                <ul className="space-y-2 mb-4 pl-0">
                                    {item.items.slice(0, 3).map((subItem, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-600 text-[12px] font-medium leading-tight">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2076C7] mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(32,118,199,0.4)]" />
                                            <span>{subItem}</span>
                                        </li>
                                    ))}
                                </ul>

                                {item.description && (
                                    <p className="text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-3 mt-auto">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <WaveDivider />
        </section>
    );
}
