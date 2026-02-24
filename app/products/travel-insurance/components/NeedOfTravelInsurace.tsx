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
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Essential Protection</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#1CADA3] mt-3">
                        Why You Need Travel Insurance
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-lg text-slate-500 mt-4">
                        Comprehensive coverage for the unexpected, ensuring your journey remains worry-free.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {coverageItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-12px_rgba(32,118,199,0.15)] hover:shadow-[0_25px_60px_-15px_rgba(32,118,199,0.3)] transition-all duration-500 border-2 border-blue-300 hover:border-primary-blue group flex flex-col md:flex-row relative"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-blue-50/50 transition-colors duration-500 -z-1" />
                            {/* Image Section */}
                            <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary-blue/10 group-hover:bg-primary-blue/0 transition-colors duration-300" />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:w-3/5 flex flex-col justify-center relative z-10">
                                {/* Header: Logo and Heading on the same line */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center shadow-sm border border-blue-100 flex-shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1CADA3] leading-tight">{item.title}</h3>
                                </div>

                                {item.highlight && (
                                    <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 mb-6 self-start border border-blue-200 uppercase tracking-wider">
                                        <span className="text-sm">👉</span> {item.highlight}
                                    </div>
                                )}

                                <ul className="space-y-3 mb-6 pl-[21px]">
                                    {item.items.map((subItem, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-600 text-[13px] font-medium leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(32,118,199,0.4)]" />
                                            <span className="-mt-0.5">{subItem}</span>
                                        </li>
                                    ))}
                                </ul>

                                {item.description && (
                                    <p className="text-xs font-bold text-slate-400 border-t border-slate-100 pt-4 mt-auto">
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
