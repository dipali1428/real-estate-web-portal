'use client';

import { motion } from 'framer-motion';
import { IconFileDescription, IconUpload, IconCheckbox, IconHeadset } from '@tabler/icons-react';
import { useModal } from '../../../context/ModalContext';

// --- Claims Data ---
const claimSteps = [
    { icon: IconFileDescription, title: 'Report Incident', desc: 'Notify us within 24 hours of the incident.', gradient: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: IconUpload, title: 'Upload Files', desc: 'Submit receipts and reports through our portal.', gradient: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: IconCheckbox, title: 'Claim Review', desc: 'Our experts verify your claim within 48 hours.', gradient: 'from-[#1CADA3] to-[#2076C7]' },
    { icon: IconHeadset, title: 'Settlement', desc: 'Approved claims paid out directly to your account.', gradient: 'from-[#1CADA3] to-[#2076C7]' }
];

export default function ClaimsAndDocuments() {
    const { openLogin } = useModal();

    return (
        <>
            {/* --- CLAIMS PROCESS --- */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Simple 4-Step Claims Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            Our claims team is available 24/7 to ensure your international journey stays protected.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-[#1CADA3]/30 -z-0" />

                        {claimSteps.map((s, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center text-center group relative z-10">
                                <div className={`w-20 h-20 bg-gradient-to-br ${s.gradient} rounded-full flex items-center justify-center mb-4 shadow-xl relative border-4 border-white`}>
                                    <s.icon size={30} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-700 mb-1 group-hover:text-[#2076C7] transition-colors">{s.title}</h3>
                                <p className="text-gray-600 text-sm px-2 leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center"><button onClick={openLogin} className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white font-black uppercase text-xs md:text-sm rounded-2xl shadow-lg hover:scale-[1.05] transition-all">Start Notification</button></div>
                </div>
            </section>
        </>
    );
}
